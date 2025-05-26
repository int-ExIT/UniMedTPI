// Exporto la duncion usando el moduo ES6 para que el front-end lo pueda reconocer
export default async function queryFetch(url, method, body) {
  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    // Chequeo el codigo de estado de la rsta
    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }

    const result = await response.json();
    console.log(result.message);
    
    return result.body;
  }
  catch (err) { throw err; }
} 