const express = require("express");
const {
  listClients,
  registerClients,
  editClients,
  listClientsById,
  deletClients,
} = require("./controllers/clientes");

const routes = express();

routes.get("/clientes", listClients);
routes.get("/clientes/:id", listClientsById);
routes.post("/clientes", registerClients);
routes.put("/clientes/:id", editClients);
routes.delete("/clientes/:id", deletClients);

module.exports = routes;
