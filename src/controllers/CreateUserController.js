const express = require ('express');

import db from '../database/connection';


export default class CreateUserController {

  async create(request, response)  {
    const {
      login,
      password
    } = request.body;

    const trx = await db.transaction();

    try {
      await trx('users').insert({
        login,
        password
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

