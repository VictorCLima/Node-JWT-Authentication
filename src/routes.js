const express = require ('express');
const router = new express.Router();

import db from './database/connection';

const routes = router;

routes.get('/login', async (request, response) => {
  const {
    login,
    password
  } = request.body;

  await db('users').insert({
    login,
    password
  })

  return response.status(201).send();
});


export default routes;
