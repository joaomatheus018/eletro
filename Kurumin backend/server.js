const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// -----------------------------------------------------
// ROTAS DE AUTENTICAÇÃO
// -----------------------------------------------------

// Rota de Login (Autenticação simples por e-mail e palavra-passe)
app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'E-mail e palavra-passe são obrigatórios.' });
  }

  // Resposta de sucesso (pode ser expandida para consulta na tabela de utilizadores)
  res.json({
    message: 'Login efetuado com sucesso!',
    user: { id: 1, email: email }
  });
});

// -----------------------------------------------------
// ROTAS DE CATEGORIAS
// -----------------------------------------------------

// Listar todas as categorias (para preencher o select no frontend)
app.get('/api/categorias', (req, res) => {
  const sql = 'SELECT * FROM categoria';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// -----------------------------------------------------
// ROTAS DE COMPONENTES (CRUD COMPLETO & RELATÓRIO)
// -----------------------------------------------------

// 1. READ: Listar todos os componentes com o nome da categoria associada
app.get('/api/componentes', (req, res) => {
  const sql = `
    SELECT c.*, cat.nome AS nome_categoria 
    FROM componente c
    LEFT JOIN categoria cat ON c.id_categoria = cat.id_categoria
    ORDER BY c.id_componente DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// 2. CREATE: Registar um novo componente no stock
app.post('/api/componentes', (req, res) => {
  const { id_categoria, id_usuario, nome, descricao, preco, quantidade_estoque } = req.body;
  const sql = `
    INSERT INTO componente (id_categoria, id_usuario, nome, descricao, preco, quantidade_estoque) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(
    sql, 
    [id_categoria, id_usuario || 1, nome, descricao || null, preco, quantidade_estoque], 
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Componente registado com sucesso!', id: result.insertId });
    }
  );
});

// 3. UPDATE: Editar um componente existente
app.put('/api/componentes/:id', (req, res) => {
  const { id } = req.params;
  const { id_categoria, nome, descricao, preco, quantidade_estoque } = req.body;
  
  const sql = `
    UPDATE componente 
    SET id_categoria = ?, nome = ?, descricao = ?, preco = ?, quantidade_estoque = ?
    WHERE id_componente = ?
  `;
  db.query(
    sql, 
    [id_categoria, nome, descricao, preco, quantidade_estoque, id], 
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Componente atualizado com sucesso!' });
    }
  );
});

// 4. DELETE: Eliminar um componente
app.delete('/api/componentes/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM componente WHERE id_componente = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Componente eliminado com sucesso!' });
  });
});

// -----------------------------------------------------
// INICIALIZAÇÃO DO SERVIDOR
// -----------------------------------------------------
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor da Eletro Kurumin a rodar em http://localhost:${PORT}`);
});