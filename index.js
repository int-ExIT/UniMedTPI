require(`dotenv`).config();
const server = require(`./app`);

const PORT = server.get(`port`);

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
});