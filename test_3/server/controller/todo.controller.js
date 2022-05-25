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
  async updateTodo(req, res) {
    const { id, perfomance } = req.body;
    const todo = await db.query(
      `UPDATE todoItem set perfomance = $1 where id = $2 RETURNING *`,
      [perfomance, id]
    );
    res.json(todo.rows[0]);
  }
  async deleteTodo(req, res) {
    const { id } = req.params;
    const todo = await db.query(
      'DELETE FROM todoItem where id = $1 RETURNING *',
      [id]
    );
    res.json(todo);
  }
}

module.exports = new TodoController();
