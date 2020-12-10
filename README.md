## Resolução de Desafio Proposto

Autor: Rafael Pontes

### Instruções de instalação

- Para rodar a aplicação em localhost, recomenda-se ter a versão estável mais recente do node e o gerenciador de pacotes yarn. Utilizou-se o banco de dados mongo.

### sobre o frontend
- foi utilizado react com bootstrap
- yarn install
- yarn start

### sobre o backend:
- é necessário configurar e rodar uma instância do mongo (localmente ou no mongo atlas, por exemplo).
- criar um arquivo .env com a url de conexão com usuário, senha, nome do banco de acordo com o template .env.exemplo e o segredo do bcrypt (módulo de criação de hash de senhas).
- yarn install
- yarn dev

### rotas da API
- todas as rotas devem ser precedidas pelo nome de host que está rodando o backend e sua porta (por padrão, está como localhost:3333)

#### Registro
- Método POST
- Corpo esperado: {nome, email, senha, cpf, nascimento, naturalidade, nacionalidade}
- Rota: <URL>:<PORTA>/api/user/registrar

#### Login
- Método POST
- Corpo esperado: {cpf, senha}
- Rota: <URL>:<PORTA>/api/user/login

#### Consome dados do usuário
- Método GET
- Cabeçalho (headers) esperado: { authorization: 'Bearer <JWTTOKEN>' }
- Rota: <URL>:<PORTA>/api/user

#### Edita dados do usuário
- Método POST
- Corpo esperado: { token: <JWTTOKEN>,  user: {nome, email, senha, cpf, nascimento, naturalidade, nacionalidade}}
- Rota: <URL>:<PORTA>/api/user