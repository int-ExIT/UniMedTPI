const server = require(`./routers/index.router`);
// const loadTables = require(`./models/index.model`);
// if (serverUp.listening) loadTables(`false`);

const PORT = server.get(`port`);

let serverUp = server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
});