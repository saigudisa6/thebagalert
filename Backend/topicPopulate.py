from flask import Flask, request, jsonify
import boto3
from boto3.dynamodb.conditions import Key

# Initialize Flask app and DynamoDB
app = Flask(__name__)
DYNAMODB_TABLE = "Topics"
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(DYNAMODB_TABLE)

@app.route('/topic', methods=['POST'])
def create_topics():
    try:
        topics_data = request.json  # Expecting a list of topic dictionaries
        if not isinstance(topics_data, list):
            return jsonify({"message": "Payload must be a list of topics."}), 400

        # Insert each topic individually
        for topic in topics_data:
            table.put_item(Item=topic)

        return jsonify({"message": "Topics created successfully."}), 201
    except Exception as e:
        return jsonify({"message": "Error creating topics.", "error": str(e)}), 500


@app.route('/topic', methods=['GET'])
def get_topic():
    try:
        topic_name = request.args.get("Topic")
        response = table.get_item(Key={"Topic": topic_name})
        if "Item" in response:
            return jsonify(response["Item"]), 200
        else:
            return jsonify({"message": "Topic not found."}), 404
    except Exception as e:
        return jsonify({"message": "Error retrieving topic.", "error": str(e)}), 500

@app.route('/topic', methods=['PATCH'])
def update_topic():
    try:
        topic_data = request.json
        topic_name = topic_data.get("Topic")
        if not topic_name:
            return jsonify({"message": "Topic is required."}), 400

        update_expression = "SET " + ", ".join(f"{key}=:{key}" for key in topic_data if key != "Topic")
        expression_values = {f":{key}": value for key, value in topic_data.items() if key != "Topic"}

        table.update_item(
            Key={"Topic": topic_name},
            UpdateExpression=update_expression,
            ExpressionAttributeValues=expression_values
        )
        return jsonify({"message": "Topic updated successfully."}), 200
    except Exception as e:
        return jsonify({"message": "Error updating topic.", "error": str(e)}), 500

@app.route('/topic', methods=['DELETE'])
def delete_topic():
    try:
        topic_name = request.args.get("Topic")
        if not topic_name:
            return jsonify({"message": "Topic is required."}), 400

        table.delete_item(Key={"Topic": topic_name})
        return jsonify({"message": "Topic deleted successfully."}), 200
    except Exception as e:
        return jsonify({"message": "Error deleting topic.", "error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
