const server = require("./routers/index.router");

const PORT = server.get("port");

server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
});