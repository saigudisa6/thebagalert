from flask import Flask, jsonify, request
import boto3
import json
import os
from flask_cors import CORS

# Create a Flask app
app = Flask(__name__)
CORS(app) 

# Example of a route that accepts a POST request with a JSON body
@app.route('/getArticle', methods=['POST'])
def get_article():
    # Initialize Bedrock client
    client = boto3.client('bedrock-runtime', region_name='us-west-2')
    print(request)
    try:
        # Parse JSON request body
        body = request.get_json()
        if not body:
            return jsonify({'error': 'Invalid JSON request body'}), 400
        
        # Extract parameters with default values
        topic = body.get('topic', '')
        skill_level = body.get('skill_level', 1)  # Default to beginner
        language = body.get('language', 'en')  # Default to English
        
        # Validate inputs
        if not topic:
            return jsonify({'error': 'Topic is required'}), 400
            
        if skill_level not in [1, 2, 3]:
            return jsonify({'error': 'Skill level must be 1, 2, or 3'}), 400

        # Prepare the prompt
        prompt = f"""You are tasked with creating an engaging and informative educational article about a financial topic.
        
        <topic>
        {topic}
        </topic>

        <skill_level>
        {skill_level}
        </skill_level>

        The skill level is a number from 1 to 3, where:
        - 1 (beginner): Simple language, basic concepts, no jargon.
        - 2 (intermediate): More complex ideas, some technical terms.
        - 3 (advanced): Deep dive, advanced terminology.

        Your article should:
        - Be no more than 105 words long.
        - Be engaging and informative.
        - Include a relevant and catchy title.
        - Be written in {language}.

        Format your output as a JSON object:
        {{
          "title": "Your Article Title Here",
          "text": "Your article content here, no more than 105 words long."
        }}"""

        # Prepare request body for Bedrock
        request_body = {
            "anthropic_version": "bedrock-2023-05-31",
            "messages": [
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": prompt
                        }
                    ]
                }
            ],
            "max_tokens": 2000,
            "temperature": 1,
            "top_p": 0.999,
            "top_k": 250
        }

        # Call Bedrock
        response = client.invoke_model(
            modelId='anthropic.claude-3-5-sonnet-20241022-v2:0',
            body=json.dumps(request_body),
            contentType='application/json',
            accept='application/json'
        )

        # Parse Bedrock response
        response_body = json.loads(response['body'].read().decode('utf-8'))
        content = response_body['content'][0]['text']

        # Extract JSON response
        json_start = content.find('{')
        json_end = content.rfind('}') + 1
        article_json = json.loads(content[json_start:json_end])

        return jsonify(article_json), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Run the app on a specific port
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
