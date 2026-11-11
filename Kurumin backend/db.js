const mysql = require('mysql2');

// Configuração da conexão com a base de dados eletro_kurumin criada no HeidiSQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Coloca a tua palavra-passe do MySQL/MariaDB se tiveres
  database: 'eletro_kurumin'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar à base de dados no HeidiSQL:', err);
    return;
  }
  console.log('Conexão com a base de dados eletro_kurumin estabelecida com sucesso!');
});

module.exports = db;