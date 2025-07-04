# GuiaPress

GuiaPress é um sistema simples de gerenciamento de artigos e categorias, desenvolvido em Node.js com Express, Sequelize, EJS e Bootstrap.

## Funcionalidades

- Cadastro, edição e exclusão de artigos
- Cadastro, edição e exclusão de categorias
- Cadastro de usuários com senha criptografada
- Autenticação de administrador
- Paginação de artigos
- Editor de texto avançado (TinyMCE)
- Interface responsiva com Bootstrap

## Tecnologias utilizadas

- Node.js
- Express
- Sequelize (MySQL)
- EJS (views)
- Bootstrap 4/5
- TinyMCE (editor de texto)
- express-session (autenticação)

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/guiapress.git
   cd guiapress
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure o banco de dados:**
   - Edite o arquivo `database/database.js` com as credenciais do seu MySQL.

4. **Inicie o projeto:**
   ```bash
   node index.js
   ```
   ou, para recarregar automaticamente:
   ```bash
   node --watch index.js
   ```

5. **Acesse no navegador:**
   ```
   http://localhost:8080
   ```

## Estrutura de pastas

- `articles/` — artigos e controller de artigos
- `categories/` — categorias e controller de categorias
- `users/` — usuários e controller de usuários
- `views/` — arquivos EJS (front-end)
- `public/` — arquivos estáticos (css, js)
- `middlewares/` — middlewares de autenticação

## Observações

- Para acessar rotas administrativas, é necessário estar autenticado como admin.
- O projeto utiliza Bootstrap para responsividade e TinyMCE para edição de artigos.


---
![image](https://github.com/user-attachments/assets/24f2270e-deee-4c6b-8bb5-864a0bc736f0)
![image](https://github.com/user-attachments/assets/8f0ea5c3-579f-4aab-86ca-b6d5f3f6fded)
![image](https://github.com/user-attachments/assets/76eb797e-9c9d-4907-a348-43762af9a953)



Desenvolvido para fins de estudo
