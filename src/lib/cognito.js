const awsConfig = {
    Auth: {
      region: "us-east-1", // Your AWS Region
      userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOL_ID, // Your User Pool ID
      userPoolWebClientId: process.env.NEXT_PUBLIC_AWS_USER_POOL_CLIENT_ID, // Your App Client ID
      mandatorySignIn: false,
    },
  };
  
  export default awsConfig;