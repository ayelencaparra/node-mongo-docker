const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://mongo:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model('User', {
  name: String,
  email: String
});

app.get('/', async (req, res) => {
  const users = await User.find();
  let html = '<h1>Usuarios</h1><table border="1"><tr><th>Nombre</th><th>Email</th></tr>';
  users.forEach(user => {
    html += `<tr><td>${user.name}</td><td>${user.email}</td></tr>`;
  });
  html += '</table>';
  res.send(html);
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});