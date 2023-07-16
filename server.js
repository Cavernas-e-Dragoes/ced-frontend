const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname + '/dist/ced'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/ced/index.html'));
});

app.listen(3000, function() {
  console.log('Aplicação Angular sendo servida na porta 3000!');
});