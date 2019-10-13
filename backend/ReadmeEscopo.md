### Nodemon - OK;

### Sucrase - OK;

### ESLint - OK;

|-> executar em todos os arquivos para padronizar o codigo
yarn eslint --fix src --ext .js

### Prettier - OK;

### EditorConfig - OK;

### Sequelize - OK;

|-> executar e criar migratons: yarn sequelize db:migrate
|-> executar e desfazer ultima: yarn sequelize db:migrate:undo
|-> executar e desfazer todas: yarn sequelize db:migrate:undo:all

### PostgresSQL - OK;

### Autenticação

**_ JWT _**
|-> metodologia de autenticação em requisições RESTS, JWT (Json Web Token);
|-> Token -> Headers (Tipo algoritimo), Payload (inf do user), Assinatura(Garante que não foi editado)
|-> utulizado MD5 para gera hach de criptografia (https://www.md5online.org/)
|-> fase utilizada: secretsevensolutions (2af5b5cf39dae03259f9907841f28b96)

### Cadastro e atualização de usuários

|-> Cadastro de usuários na aplicação utilizando nome, e-mail e senha.

|-> Atualizar dados, senha, usuário, campo de confirmação com a mesma senha antes cadastrada.

|-> Criptografe a senha JWT.
|-> Validação dos dados de entrada atraves de Token gerado;
|-> Validação dos campos com YUP

#### TDD com faker e factory

|-> populando dados com faker e factory para teste
|-> **tests**/integration/auth.test.js -> Teste validação token.
|-> **tests**/integration/session.test -> Testes acesso de sessão do usuário
|-> **tests**/integration/user.test.js -> Testes criar, atualizar dados do usuário

### Gerenciamento de arquivos

Crie uma rota para upload de arquivos que cadastra em uma tabela o caminho e nome do arquivo e retorna todos dados do arquivo cadastrado.

|-> multer -> upload de arquivos form/data
|-> diretorio local para upload -> tmp/uploads

### Gerenciamento de meetups

|-> cadastrar meetups
|-> Campos -> título, descrição, localização, data e hora e imagem (banner), user_id.

|-> Validação cadastrar meetups por data.
|-> validação data -> date-fns

O usuário também deve poder editar todos dados de meetups que ainda não aconteceram e que ele é organizador.

Crie uma rota para listar os meetups que são organizados pelo usuário logado.

O usuário deve poder cancelar meetups organizados por ele e que ainda não aconteceram. O cancelamento deve deletar o meetup da base de dados.
