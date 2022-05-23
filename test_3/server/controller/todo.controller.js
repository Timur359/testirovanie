const db = require('../db');

class TodoController {
  async getTodo(req, res) {
    const todos = await db.query('SELECT * FROM todoItem');
    res.json(todos.rows);
  }
  async createTodo(req, res) {
    const { name, description, date, perfomance = 0 } = req.body;
    const newTodo = await db.query(
      `INSERT INTO todoItem (name, description, date, perfomance) values ($1, $2, $3, $4) RETURNING *`,
      [name, description, date, perfomance]
    );
    res.json(newTodo.rows[0]);
  }
  async getOneUser(req, res) {
    const id = req.params.id;
    const user = await db.query('SELECT * FROM person where id = $1', [id]);
    res.json(user.rows[0]);
  }
  async updateTodo(req, res) {
    const { id, perfomance } = req.body;
    const todo = await db.query(
      `UPDATE todoItem set perfomance = $1 where id = $2 RETURNING *`,
      [perfomance, id]
    );
    res.json(todo.rows[0]);
  }
  async deleteUser(req, res) {
    const id = req.params.id;
    const user = await db.query('DELETE FROM person where id = $1', [id]);
    res.json(user.rows[0]);
  }
}

module.exports = new TodoController();
