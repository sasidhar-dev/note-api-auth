exports.handler = async (event) => {
    let notes = [];
  
    if (event.httpMethod === 'POST') {
      const newNote = JSON.parse(event.body);
      notes.push(newNote);
    }
  
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify(notes),
    };
    return response;
  };
  