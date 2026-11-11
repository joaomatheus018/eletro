const API_URL = 'http://localhost:3000/api';

document.addEventListener('DOMContentLoaded', () => {
  // Login
  document.getElementById('form-login').addEventListener('submit', realizarLogin);
  document.getElementById('btn-sair').addEventListener('submit', realizarSair);
  document.getElementById('btn-sair').addEventListener('click', realizarSair);

  // CRUD
  document.getElementById('form-componente').addEventListener('submit', salvarComponente);
  document.getElementById('btn-cancelar').addEventListener('click', limparFormulario);
});

// --- AUTENTICAÇÃO ---
function realizarLogin(e) {
  e.preventDefault();
  // Simulação de login (pode introduzir qualquer e-mail e palavra-passe para aceitar)
  document.getElementById('tela-login').style.display = 'none';
  document.getElementById('painel-principal').style.display = 'block';

  carregarCategorias();
  carregarComponentes();
}

function realizarSair() {
  document.getElementById('painel-principal').style.display = 'none';
  document.getElementById('tela-login').style.display = 'flex';
  document.getElementById('form-login').reset();
}

// --- GESTÃO DE COMPONENTES (CRUD & RELATÓRIO) ---
async function carregarCategorias() {
  try {
    const res = await fetch(`${API_URL}/categorias`);
    const categorias = await res.json();
    const select = document.getElementById('id_categoria');
    
    select.innerHTML = '<option value="">Selecione a Categoria</option>';
    categorias.forEach(cat => {
      select.innerHTML += `<option value="${cat.id_categoria}">${cat.nome}</option>`;
    });
  } catch (err) {
    console.error('Erro ao carregar categorias:', err);
  }
}

async function carregarComponentes() {
  try {
    const res = await fetch(`${API_URL}/componentes`);
    const componentes = await res.json();

    const tbody = document.querySelector('#tabela-componentes tbody');
    tbody.innerHTML = '';

    let valorTotalEstoque = 0;

    if (componentes.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Nenhum componente registado.</td></tr>';
    } else {
      componentes.forEach(comp => {
        const preco = parseFloat(comp.preco || 0);
        const qtd = parseInt(comp.quantidade_estoque || 0);
        valorTotalEstoque += (preco * qtd);

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${comp.id_componente}</td>
          <td>${comp.nome}</td>
          <td>${comp.descricao || '-'}</td>
          <td>R$ ${preco.toFixed(2)}</td>
          <td>${qtd}</td>
          <td>
            <button class="btn-acao-editar" onclick="preencherEdicao(${comp.id_componente}, '${comp.nome}', '${comp.descricao || ''}', ${preco}, ${qtd}, ${comp.id_categoria})">Editar</button>
            <button class="btn-acao-excluir" onclick="excluirComponente(${comp.id_componente})">Eliminar</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    }

    // Atualiza o Relatório (Valor Total)
    document.getElementById('valor-total').innerText = valorTotalEstoque.toFixed(2);
  } catch (err) {
    console.error('Erro ao carregar componentes:', err);
  }
}

async function salvarComponente(e) {
  e.preventDefault();
  
  const id = document.getElementById('componente-id').value;
  const dados = {
    nome: document.getElementById('nome').value,
    id_categoria: document.getElementById('id_categoria').value,
    preco: parseFloat(document.getElementById('preco').value),
    quantidade_estoque: parseInt(document.getElementById('quantidade_estoque').value),
    descricao: document.getElementById('descricao').value,
    id_usuario: 1
  };

  const url = id ? `${API_URL}/componentes/${id}` : `${API_URL}/componentes`;
  const method = id ? 'PUT' : 'POST';

  try {
    await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });

    limparFormulario();
    carregarComponentes();
  } catch (err) {
    console.error('Erro ao salvar componente:', err);
  }
}

async function excluirComponente(id) {
  if (confirm('Tem a certeza de que deseja eliminar este componente?')) {
    try {
      await fetch(`${API_URL}/componentes/${id}`, { method: 'DELETE' });
      carregarComponentes();
    } catch (err) {
      console.error('Erro ao eliminar componente:', err);
    }
  }
}

function preencherEdicao(id, nome, descricao, preco, estoque, idCategoria) {
  document.getElementById('componente-id').value = id;
  document.getElementById('nome').value = nome;
  document.getElementById('descricao').value = descricao;
  document.getElementById('preco').value = preco;
  document.getElementById('quantidade_estoque').value = estoque;
  document.getElementById('id_categoria').value = idCategoria;

  document.getElementById('btn-cancelar').style.display = 'inline-block';
}

function limparFormulario() {
  document.getElementById('form-componente').reset();
  document.getElementById('componente-id').value = '';
  document.getElementById('btn-cancelar').style.display = 'none';
}