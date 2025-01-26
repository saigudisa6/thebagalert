import { CognitoIdentityProviderClient, InitiateAuthCommand, SignUpCommand, ConfirmSignUpCommand } from "@aws-sdk/client-cognito-identity-provider";

const cognitoClient = new CognitoIdentityProviderClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION
});

export async function signIn(username, password) {
    console.log(username)
    const command = new InitiateAuthCommand({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: process.env.NEXT_PUBLIC_AWS_USER_POOL_CLIENT_ID,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password
      }
    });
    return cognitoClient.send(command);
  }
  
  export async function signUp(username, password, email) {
    const command = new SignUpCommand({
      ClientId: process.env.NEXT_PUBLIC_AWS_USER_POOL_CLIENT_ID,
      Username: username,
      Password: password,
      UserAttributes: [
        {
          Name: "email",
          Value: email
        }
      ]
    });
    return cognitoClient.send(command);
  }
  
  export async function confirmSignUp(username, code) {
    const command = new ConfirmSignUpCommand({
      ClientId: process.env.NEXT_PUBLIC_AWS_USER_POOL_CLIENT_ID,
      Username: username,
      ConfirmationCode: code
    });
    return cognitoClient.send(command);
  }
  