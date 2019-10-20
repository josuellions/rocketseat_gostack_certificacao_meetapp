### Projeto Certificação RocketSeat

### 2019/10/07

### Nome App: Meetapp

### Developer: Josuel A. Lopes

### Padrão de código Airbnb

### Esturtura projeto

|-> src/app.js
||-> middlewares / routes

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
