from flask import Flask, request, jsonify
import boto3
from boto3.dynamodb.conditions import Key

# Initialize Flask app and DynamoDB
app = Flask(__name__)
DYNAMODB_TABLE = "UserProfile"
dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(DYNAMODB_TABLE)

@app.route('/user', methods=['POST'])
def create_user():
    try:
        user_data = request.json
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
