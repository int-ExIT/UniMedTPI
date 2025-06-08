// Export ES6 para el reconocimiento del front-end
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
    
    console.log(`Result fetch: ${result.message}`);
    // console.log(`Element: ${JSON.stringify(result.body)}`);
    
    return result.body;
  }
  catch (err) { console.error(`Fetch ${err}`); }
} 