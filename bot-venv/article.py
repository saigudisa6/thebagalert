import boto3
import json

client = boto3.client('bedrock-runtime', region_name='us-east-1')

def main():
    request_body = {
        "anthropic_version": "bedrock-2023-05-31",
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": """You are tasked with creating an engaging and informative, educational article about a financial topic. You will be given two inputs:
                                <topic>
                                {{TOPIC}}
                                </topic>

                                <skill_level>
                                {{SKILL_LEVEL}}
                                </skill_level>

                                The skill level is a number from 1 to 3, where 1 is beginner, 2 is intermediate, and 3 is advanced.

                                When writing the article, consider the following guidelines based on the skill level:
                                - For level 1 (beginner): Use simple language, explain basic concepts, and avoid jargon.
                                - For level 2 (intermediate): Introduce more complex ideas, use some technical terms, and assume basic knowledge of the topic.
                                - For level 3 (advanced): Dive deeper into the subject, use slightly more advanced terminology, and explore nuanced aspects of the topic.

                                Your article should meet the following requirements:
                                1. Be no more than 105 words long.
                                2. Be engaging and informative, avoiding a dry or textbook-like style.
                                3. Include a relevant and catchy title.

                                Structure your output as a JSON object with two fields: "title" and "text". The "title" field should contain the article's title, and the "text" field should contain the body of the article.

                                Here's an example of how your output should be formatted:

                                {
                                  "title": "Your Article Title Here",
                                  "text": "Your article content here, no more than 105 words long."
                                }

                                Remember to make the article engaging and tailored to the given skill level while staying within the word limit."""
                    }
                ]
            }
        ],
        "max_tokens": 2000,
        "temperature": 1,
        "top_p": 0.999,
        "top_k": 250
    }

    try:
        response = client.invoke_model(
            modelId='us.anthropic.claude-3-5-sonnet-20241022-v2:0',
            body=json.dumps(request_body),
            contentType='application/json',
            accept='application/json'
        )
        
        response_body = json.loads(response.get('body').read().decode('utf-8'))
        content = response_body['content'][0]['text']
        json_start = content.find('{')
        json_end = content.rfind('}') + 1
        print(json.loads(content[json_start:json_end]))
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    main()