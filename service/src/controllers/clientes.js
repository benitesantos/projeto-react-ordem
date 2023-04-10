const knex = require("../config/database");

const listClients = async (req, res) => {
  const { filter } = req.query;
  try {
    let query = await knex("clientes").orderBy("id");
    if (filter) {
      query = await knex("clientes").where("nome", "ILIKE", `%${filter}%`);
    }

    const clientes = await query;
    return res.status(200).json(clientes);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const listClientsById = async (req, res) => {
  const { id } = req.params;

  try {
    const clientes = await knex("clientes")
      .where("id", id)
      .returning("*")
      .first();
    return res.status(200).json(clientes);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const registerClients = async (req, res) => {
  const { nome, endereco, telefone, email } = req.body;

  try {
    const register = await knex("clientes")
      .insert({
        nome,
        endereco,
        telefone,
        email,
      })
      .returning("*");

    return res.json(register[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const editClients = async (req, res) => {
  const { nome, endereco, telefone, email } = req.body;
  const { id } = req.params;

  try {
    const edit = await knex("clientes")
      .update({
        nome,
        endereco,
        telefone,
        email,
      })
      .where("id", id)
      .returning("*");
    return res.json(edit[0]);
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

const deletClients = async (req, res) => {
  const { id } = req.params;

  try {
    const delet = await knex("clientes").delete().where({ id });
    return res.status(201).json({ mensagem: "Cliente excluido com sucesso!" });
  } catch (error) {
    return res.status(500).json({ mensagem: "Erro interno do servidor" });
  }
};

module.exports = {
  listClients,
  listClientsById,
  registerClients,
  editClients,
  deletClients,
};
