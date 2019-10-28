### Projeto Certificação RocketSeat

### 2019/10/07

### Nome App: Meetapp

### Developer: Josuel A. Lopes

### Padrão de código Airbnb

### Esturtura projeto

|-> src/app.js
|-> middlewares / routes

### Server aplicaçãogit checkout -b

git checkout -b
|-> src/server.jsgit checkout -b
||-> Definindo porta de acesso server aplicaçãogit checkout -b

### Routes acesso da aplicação

|-> src/routes.js
||-> Definindo as rotas da aplicação

#### Sucrase

|-> Configrando arquivo nodemon.json, para rodar o sucrase

### TESTES TDD - JEST

**_ Produção _**
|-> APP_SECRET=secretsevensolutions
|-> DB_NAME=bdmeetapp

**_ Teste _**
|-> APP_SECRET=templatenoderocketseat
|-> DB_DIALECT=sqlite

### Notificações para Organizador do meetup

|-> Utilizando **_ Mailtrap(DEV)_**
|-> Templeta email -> express-handlebars / nodemailer-express-handlebars
|-> Performace no envio de notificações por email -> redis:alpine / bee-queue (controle de filas)

### Tratamento de Erros e Exceções

|-> @sentry/node@5.7.1 / express-async-errors
|-> visualização tratamento erros e exceções -> Youch

### Configuração de variáveis de ambiente

|-> .env / .env.exemple / .env.test

### Configurando CORS - Permitir acesso de outras APIs

**_ Estrutura e requisitos projeto _**

**\* Server / Backend \_**

### Autenticação

|-> SessionController

> Permita que um usuário se autentique em sua aplicação utilizando e-mail e senha.
> A autenticação deve ser feita utilizando JWT.
> Realize a validação dos dados de entrada;

### Cadastro e atualização de usuários

|-> UserController

> Permita que novos usuários se cadastrem em sua aplicação utilizando nome, e-mail e senha.

> Para atualizar a senha, o usuário deve também enviar um campo de confirmação com a mesma senha.

> Criptografe a senha do usuário para segurança.

> Realize a validação dos dados de entrada;

### Gerenciamento de arquivos

|-> FileController

> Crie uma rota para upload de arquivos que cadastra em uma tabela o caminho e nome do arquivo e retorna todos dados do arquivo cadastrado.

### Gerenciamento de meetups

|-> EventsmeetupsControlle

> O usuário pode cadastrar meetups na plataforma com título do meetup, descrição, localização, data e hora e imagem (banner). Todos campos são obrigatórios.

> Adicione também um campo user_id que armazena o ID do usuário que organiza o evento.

> Não deve ser possível cadastrar meetups com datas que já passaram.

> O usuário também deve poder editar todos dados de meetups que ainda não aconteceram e que ele é organizador.

> O usuário deve poder cancelar meetups organizados por ele e que ainda não aconteceram. O cancelamento deve deletar o meetup da base de dados.

|-> ScheduleEventsController

> Crie uma rota para listar os meetups que são organizados pelo usuário logado.

### Inscrição no meetup

|-> SubscriptionmeetupsController

> O usuário deve poder se inscrever em meetups que não organiza.

> O usuário não pode se inscrever em meetups que já aconteceram.

> O usuário não pode se inscrever no mesmo meetup duas vezes.

> O usuário não pode se inscrever em dois meetups que acontecem no mesmo horário.

|-> NotificationController

> Sempre que um usuário se inscrever no meetup, envie um e-mail ao organizador contendo os dados relacionados ao usuário inscrito. O template do e-mail fica por sua conta :)

### Listagem de meetups

|-> EventsmeetupsControlle

> Crie uma rota para listar os meetups com filtro por data (não por hora), os resultados dessa listagem devem vir paginados em 10 itens por página. Abaixo tem um exemplo de chamada para a rota de listagem dos meetups:

```
http://localhost:3333/meetups?date=2019-07-01&page=2
```

> Nesse exemplo, listaremos a página 2 dos meetups que acontecerão no dia 01 de Julho.

> Nessa listagem retorne também os dados do organizador.

### Listagem de inscrições

|-> SubscriptionmeetupsController

> Crie uma rota para listar os meetups em que o usuário logado está inscrito.

> Liste apenas meetups que ainda não passaram e ordene meetups mais próximos como primeiros da lista.
