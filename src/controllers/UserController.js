const express = require ('express');
const bcrypt = require ('bcrypt');

import db from '../database/connection';



/* const hashPassword = ( password,  callback) => {
  //generate salt hen run callback
  bcrypt.genSalt(10, (err, salt) => {
    if(err) {
      return callback(err);
    }
  })
// hash (encrypt) the password using the salt then run callback
  bcrypt.hash(password, salt, null, () => {
    if(err) {
      return callback(err);
    }
  })
// overwrite plain text password with encrypted password
  callback(null,)

} */


export default class UserController {


  async create(request, response)  {
    const {
      login,
      password
    } = request.body;


    const trx = await db.transaction();

    try {

      const salt = await bcrypt.genSalt()

      request.body.password =   await bcrypt.hash(request.body.password, salt)

      await trx('users').insert({
        login,
        password: request.body.password
      })

      await trx.commit();

      return response.status(201).send();

    } catch(err) {

      await trx.rollback();
      return response.status(400).json({
        error: 'Ocorreu um erro ao criar o usuário',
      })
    }
  }
}

