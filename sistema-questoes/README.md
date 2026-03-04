# Sistema de Cadastro de Questões

## Como rodar

### 1. Banco de dados
Execute o arquivo `banco.sql` no MySQL:
```
mysql -u root -p < banco.sql
```

### 2. Configurar conexão
Edite `config/db.js` e coloque seu usuário e senha do MySQL.

### 3. Instalar dependências
```
npm install
```

### 4. Iniciar o servidor
```
node app.js
```

Acesse: http://localhost:3000

---

## Estrutura do Projeto

```
sistema-questoes/
├── app.js                        # Entrada principal
├── banco.sql                     # Script do banco
├── config/
│   └── db.js                     # Conexão MySQL
├── middleware/
│   └── auth.js                   # Verificação JWT
├── controllers/
│   ├── authController.js         # Login/Registro/Logout
│   ├── disciplinasController.js  # CRUD disciplinas
│   └── questoesController.js     # CRUD questões
├── routes/
│   ├── auth.js
│   ├── disciplinas.js
│   └── questoes.js
└── views/
    ├── login.ejs
    ├── registro.ejs
    ├── home.ejs
    ├── disciplinas/
    │   ├── index.ejs
    │   └── form.ejs
    └── questoes/
        ├── index.ejs
        └── form.ejs
```

## Funcionalidades
- Registro e login com senha criptografada (bcrypt)
- Autenticação via JWT salvo em cookie HTTP-only
- CRUD completo de Disciplinas
- CRUD completo de Questões (vinculadas à disciplina)
- Proteção de todas as rotas via middleware
