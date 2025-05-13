require(`dotenv`).config();
const server = require(`./routers/index.router`);
// const bdd = require(`./models/index`);

const PORT = server.get(`port`);

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
});