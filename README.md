# ⚡ Eletro Kurumin — Sistema de Gestão de Stock

> Projeto académico desenvolvido para o controlo e gestão de stock de componentes eletrónicos.

---

## 📌 Sobre o Projeto

O **Eletro Kurumin** é um sistema web full-stack para gerir componentes eletrónicos, permitindo o registo, consulta, atualização e remoção de produtos.

O sistema também permite organizar componentes por categorias e controlar a quantidade disponível no stock.

---

## 🚀 Funcionalidades

- 🔒 Sistema de **Login e Logout**
- 📦 Gestão de componentes (**CRUD**)
- ➕ Registo de novos componentes
- ✏️ Atualização de informações
- 🗑️ Remoção de componentes
- 📂 Organização por categorias
- 📊 Controlo da quantidade em stock
- 💰 Cálculo do valor total do stock

---

## 🛠️ Tecnologias

### Frontend
- HTML5
- CSS3
- JavaScript
- Fetch API

### Backend
- Node.js
- Express
- CORS
- MySQL2

### Base de Dados
- MySQL / MariaDB

### Ferramentas
- HeidiSQL
- Git
- GitHub
- Visual Studio Code

---

## 🗄️ Base de Dados

A base de dados utiliza uma estrutura relacional com as principais tabelas:

- **categoria** — Armazena as categorias dos componentes.
- **componente** — Armazena os componentes e informações do stock.
- **movimentacao** — Regista as movimentações realizadas.

---

## 📂 Estrutura do Projeto

```text
Kurumin/
│
├── kurumin backend/
│   ├── db.js
│   ├── server.js
│   └── package.json
│
├── kurumin frontend/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   └── index.html
│
└── README.md
```

---

## ⚙️ Como Executar

### 1. Base de Dados

Crie a base de dados **`eletro_kurumin`** no MySQL/MariaDB e execute o script SQL do projeto.

### 2. Backend

```bash
cd "kurumin backend"
npm install
node server.js
```

O servidor será iniciado em:

```text
http://localhost:3000
```

### 3. Frontend

Abra o ficheiro:

```text
kurumin frontend/index.html
```

Ou utilize a extensão **Live Server** no Visual Studio Code.

---

## 🔌 API REST

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/api/login` | Autenticação do utilizador |
| `GET` | `/api/categorias` | Lista as categorias |
| `GET` | `/api/componentes` | Lista os componentes |
| `POST` | `/api/componentes` | Regista um componente |
| `PUT` | `/api/componentes/:id` | Atualiza um componente |
| `DELETE` | `/api/componentes/:id` | Remove um componente |

---

## 👤 Autor

**João Matheus Takeshita**

Projeto desenvolvido para fins académicos.

GitHub: [@joaomatheus018](https://github.com/joaomatheus018?utm_source=chatgpt.com)

---

⭐ **Eletro Kurumin — Sistema de Gestão de Stock**
