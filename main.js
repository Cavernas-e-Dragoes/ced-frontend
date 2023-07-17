const express = require('express');
const app = express();

const port = process.env.PORT || 3000; // Use a variável de ambiente PORT ou a porta padrão 3000

app.use(express.static(__dirname + '/dist/ced')); // Defina o diretório raiz dos arquivos estáticos do seu aplicativo Angular

app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor iniciado em http://0.0.0.0:${port}`);
});