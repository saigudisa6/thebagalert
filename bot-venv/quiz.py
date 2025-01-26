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
                        "text": """Given a financial article and a skill level (1-3), generate a multiple choice question. The question difficulty should match the skill level:
                                Level 1 (beginner): Basic comprehension and recall
                                Level 2 (intermediate): Application and analysis
                                Level 3 (advanced): Analysis and evaluation

                                <article>
                                {{ARTICLE_TEXT}}
                                </article>

                                <skill_level>
                                {{SKILL_LEVEL}}
                                </skill_level>

                                Return a JSON object with:
                                - question: The multiple choice question
                                - choices: Object with keys A, B, C, D containing answer choices
                                - explanations: Object with keys A, B, C, D containing explanations for why each choice is correct/incorrect
                                - scores: Object with keys A, B, C, D containing 1 for correct answer, 0 for incorrect

                                Example format:
                                {
                                    "question": "Question text here?",
                                    "choices": {
                                        "A": "First choice",
                                        "B": "Second choice", 
                                        "C": "Third choice",
                                        "D": "Fourth choice"
                                    },
                                    "explanations": {
                                        "A": "Why A is correct/incorrect",
                                        "B": "Why B is correct/incorrect",
                                        "C": "Why C is correct/incorrect", 
                                        "D": "Why D is correct/incorrect"
                                    },
                                    "scores": {
                                        "A": 1,
                                        "B": 0,
                                        "C": 0,
                                        "D": 0
                                    }
                                }"""
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