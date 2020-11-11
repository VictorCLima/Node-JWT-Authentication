const bcrypt = require ('bcrypt');

import db from '../database/connection';


export default class UserController {

//User create
  async create(req , res, next )  {
    const {
      login,
      password
    } = req.body;

    const trx = await db.transaction();

    try {
      const salt = await bcrypt.genSalt();
      req.body.password = await bcrypt.hash(req.body.password, salt)

      await trx('users')
      .insert({
        login,
        password : req.body.password
      })
      await trx.commit();
      return res.status(201).send()

    } catch(error) {

        await trx.rollback();
        next(error)

      }

  }


  //Users list
  async index(req, res, next)  {

    const trx = await db.transaction();
    try {

      const results = await trx('users')
      return res.json(results);
      console.log(results);

    } catch(error) {
      await trx.rollback();
      next(error)
    }
  }


  //Edit user
  async update(req , res, next)  {
    const { login } = req.body
    const { id } = req .params

    //const trx = await db.transaction();

    try {

      await db('users')
      .update({ login })
      .where({ id })


      return res.send();


    } catch(err) {
        await db.rollback();
        next(error)
    }
  }

  async delete(req , res, next)  {
    const { login } = req.body
    const { id } = req .params

    //const trx = await db.transaction();

    try {

      await db('users')
      .delete({ login })
      .where({ id })


      return res.send();


    } catch(err) {
        await db.rollback();
        next(error)
    }
  }
}

