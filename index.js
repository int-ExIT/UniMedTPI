const server = require(`./routers/index.router`);
const loadTables = require(`./models/index.model`);

const PORT = server.get(`port`);

let serverUp = server.listen(PORT, () => {
  loadTables(true);
  
  console.log(`Servidor escuchando en el puerto ${PORT}`)
});