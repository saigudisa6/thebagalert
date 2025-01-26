from flask import Flask, request, jsonify
import boto3
from boto3.dynamodb.conditions import Key

# Initialize Flask app and DynamoDB
app = Flask(__name__)
DYNAMODB_TABLE = "UserProfile"
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(DYNAMODB_TABLE)
topics_table = dynamodb.Table("Topics")

def create_user_profile_with_topics(user_id, first_name, last_name, email, topic_list):
    """
    Creates a user profile by fetching subtopics for each topic from the DynamoDB Topics table.
    """
    financial_topics = []
    
    for topic in topic_list:
        # Fetch the topic from the Topics table
        try:
            response = topics_table.get_item(Key={"TopicID": topic})
            topic_data = response.get("Item")
            
            if not topic_data:
                print(f"Topic '{topic}' not found in Topics table.")
                continue
            
            # Construct the FinancialTopics entry
            subtopics = topic_data.get("SubTopics", [])
            main_subtopics = [{"SubTopic": subtopic["SubTopic"], "Score": 0} for subtopic in subtopics]
            
            financial_topic = {
                "MainTopic": topic,
                "SubTopics": main_subtopics,
                "TopicLevel": 1
            }
            financial_topics.append(financial_topic)
        
        except Exception as e:
            print(f"Error fetching topic '{topic}': {str(e)}")
            continue

    # Construct the complete user profile
    user_profile = {
        "UserID": user_id,
        "FirstName": first_name,
        "LastName": last_name,
        "Email": email,
        "FinancialTopics": financial_topics,
        "StreakCount": 0,
        "TotalXP": 0,
        "AccountLevel": 1
    }

    return user_profile

@app.route('/user', methods=['POST'])
def create_user():
    try:
        user_data = create_user_profile_with_topics("11111", "Ram", "G", "email@gmail.com", ["Investing", "Credit", "Taxes"])
        print(user_data)
        table.put_item(Item=user_data)
        return jsonify({"message": "User created successfully."}), 201
    except Exception as e:
        return jsonify({"message": "Error creating user.", "error": str(e)}), 500

@app.route('/user', methods=['GET'])
def get_user():
    try:
        user_id = request.args.get("UserID")
        response = table.get_item(Key={"UserID": user_id})
        if "Item" in response:
            return jsonify(response["Item"]), 200
        else:
            return jsonify({"message": "User not found."}), 404
    except Exception as e:
        return jsonify({"message": "Error retrieving user.", "error": str(e)}), 500

@app.route('/user', methods=['PATCH'])
def update_user():
    try:
        user_data = request.json
        user_id = user_data.get("UserID")
        if not user_id:
            return jsonify({"message": "UserID is required."}), 400

        update_expression = "SET " + ", ".join(f"{key}=:{key}" for key in user_data if key != "UserID")
        expression_values = {f":{key}": value for key, value in user_data.items() if key != "UserID"}

        table.update_item(
            Key={"UserID": user_id},
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_values
        )
        return jsonify({"message": "User updated successfully."}), 200
    except Exception as e:
        return jsonify({"message": "Error updating user.", "error": str(e)}), 500

@app.route('/user', methods=['DELETE'])
def delete_user():
    try:
        user_id = request.args.get("UserID")
        if not user_id:
            return jsonify({"message": "UserID is required."}), 400

        table.delete_item(Key={"UserID": user_id})
        return jsonify({"message": "User deleted successfully."}), 200
    except Exception as e:
        return jsonify({"message": "Error deleting user.", "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
