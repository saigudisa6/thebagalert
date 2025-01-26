export async function getArticle(article, skillLevel, lang){
    const url = 'https://q3kj7z7dzpkalcyezbt4jmdfdy0qrxfz.lambda-url.us-east-1.on.aws/'; // Your Lambda URL
    // Request body data
    const requestBody = {
        topic: article,  // Example topic
        skill_level: skillLevel,              // Example skill level
        language: lang               // Example language
    };

    try {
        const response = await fetch(url, {
            method: 'POST',  // Use POST to send the body
            headers: {
                'Content-Type': 'application/json'  // Make sure the content type is set to application/json
            },
            body: JSON.stringify(requestBody)  // Stringify the request body
        });

        // Check if the response status code indicates a successful response
        if (!response.ok) {
            // Log detailed error information for debugging
            console.error(`Error: Received status code ${response.status}`);
            const errorBody = await response.text();  // Read the error body as text
            console.error('Response Body:', errorBody);
            
            throw new Error(`Request failed with status ${response.status}`);
        }

        // Attempt to parse the response as JSON
        let data;
        try {
            data = await response.json();
        } catch (e) {
            // Handle non-JSON responses
            console.error('Error parsing JSON response:', e);
            const textResponse = await response.text();  // Log raw response text
            console.error('Response Text:', textResponse);
            throw new Error('Failed to parse JSON response');
        }

        // Log the successful response data
        console.log('Generated Article:', data);
        return data;
    } catch (error) {
        // Log any errors that occurred during the fetch or JSON parsing
        console.error('Error during fetch operation:', error);
        return { error: error.message };
    }

    }

export async function getQuestion(article, skillLevel, lang){
    const url = 'https://q3kj7z7dzpkalcyezbt4jmdfdy0qrxfz.lambda-url.us-east-1.on.aws/';  // Lambda endpoint URL
  
  const requestBody = {
    article: article,
    skill_level: skillLevel,
    language: language
  };

  console.log(requestBody)
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),  // Body to be sent in the POST request
    });

    // Handle the response from Lambda
    if (response.ok) {
      const data = await response.json();
      console.log('Generated Question:', data);
      return data;  // The question JSON object
    } else {
      const errorData = await response.json();
      console.error('Error:', errorData.error);
    }
}