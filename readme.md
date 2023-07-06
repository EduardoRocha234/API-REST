# Documentação - API de Jogos

Esta documentação fornece uma visão geral dos endpoints disponíveis na API de Jogos. A API é construída usando o Express.js e se conecta a um banco de dados usando o Sequelize.

## Endpoints

### Autenticação


# Documentação - API de Usuários

Esta documentação fornece uma visão geral dos endpoints disponíveis na API de Usuários. A API é construída usando o Express.js e inclui funcionalidades de criação de usuários e autenticação.

## Endpoints

### 1. Criar Usuário

- Método: POST
- Endpoint: /user/create

Este endpoint cria um novo usuário no banco de dados.

#### Requisição

- Corpo da requisição:
  - name: Nome do usuário (string)
  - email: Endereço de e-mail do usuário (string)
  - password: Senha do usuário (string)

#### Resposta

- Código de status: 200 (OK)
- Código de status: 400 (Requisição inválida) - Se o e-mail já existir no banco de dados.

### 2. Autenticação de Usuário

- Método: POST
- Endpoint: /auth

Este endpoint lida com a autenticação do usuário e gera um JSON Web Token (JWT) para o usuário autenticado.

#### Requisição

- Corpo da requisição:
  - email: Endereço de e-mail do usuário (string)
  - password: Senha do usuário (string)

#### Resposta

- Código de status: 200 (OK)
- Corpo da resposta: Objeto contendo o token gerado
- Código de status: 400 (Requisição inválida) - Se ocorrer um erro ao gerar o token ou o e-mail for inválido.
- Código de status: 401 (Não autorizado) - Se as credenciais forem inválidas.

## Uso

Para usar a API de Usuários, faça requisições HTTP para os endpoints apropriados usando os métodos especificados.

### 1. Obter todos os jogos

- Método: GET
- Endpoint: /games
- Autenticação necessária: Sim

Este endpoint recupera todos os jogos do banco de dados.

#### Requisição

Não são necessários parâmetros de requisição.

#### Resposta

- Código de status: 200 (OK)
- Corpo da resposta: Array de objetos de jogos

### 2. Obter um jogo específico

- Método: GET
- Endpoint: /game/:id
- Autenticação necessária: Sim

Este endpoint recupera um jogo específico pelo seu ID.

#### Requisição

- Parâmetro do caminho:
  - id: ID do jogo (inteiro)

#### Resposta

- Código de status: 200 (OK)
- Corpo da resposta: Objeto de jogo

Se o jogo com o ID especificado não for encontrado, a API responderá com o código de status 404 (Não encontrado).

### 3. Criar um novo jogo

- Método: POST
- Endpoint: /game
- Autenticação necessária: Sim

Este endpoint cria um novo jogo no banco de dados.

#### Requisição

- Corpo da requisição:
  - title: Título do jogo (string)
  - price: Preço do jogo (número)
  - year: Ano de lançamento do jogo (número)

#### Resposta

- Código de status: 200 (OK)

Se o corpo da requisição for inválido ou a criação falhar, a API responderá com o código de status 400 (Requisição inválida).

### 4. Excluir um jogo

- Método: DELETE
- Endpoint: /game/:id
- Autenticação necessária: Sim

Este endpoint exclui um jogo específico pelo seu ID.

#### Requisição

- Parâmetro do caminho:
  - id: ID do jogo (inteiro)

#### Resposta

- Código de status: 200 (OK)

Se o jogo com o ID especificado não for encontrado, a API responderá com o código de status 404 (Não encontrado).

### 5. Atualizar um jogo

- Método: PUT
- Endpoint: /game/:id
- Autenticação necessária: Sim

Este endpoint atualiza um jogo específico pelo seu ID.

#### Requisição

- Parâmetro do caminho:
  - id: ID do jogo (inteiro)
- Corpo da requisição:
  - title: Título atualizado do jogo (string)
  - price: Preço atualizado do jogo (número)
  - year: Ano de lançamento atualizado do jogo (número)

#### Resposta

- Código de status: 200 (OK)

Se o jogo com o ID especificado não for encontrado ou a atualização falhar, a API responderá com o código de status 404 (Não encontrado).

## Executando a API

Para executar a API, certifique-se de ter o Node.js e o npm (Node Package Manager) instalados. Siga estas etapas:

1. Instale as dependências necessárias:
   ```bash
   npm install
   ```

2. Inicie o servidor da API:
   ```bash
   npm start
   ```

A API será executada em http://localhost:8080.

Observação: Certifique-se de configurar a conexão com o banco de dados e definir a chave secreta JWT apropriada no código antes de executar a API.

Antes de acessar qualquer um dos endpoints, a autenticação é necessária. O middleware `auth` é usado para garantir a autenticação.