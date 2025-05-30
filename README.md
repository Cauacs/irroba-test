
# API de Agendamentos Médicos com Laravel

Este é um projeto backend para um sistema de agendamento de consultas médicas, desenvolvido em Laravel com autenticação via Passport e ambiente local utilizando Laravel Sail.

Para instalar o projeto, siga os passos abaixo:

Clone o repositório com:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
````

Instale o Laravel Sail como dependência de desenvolvimento:

```bash
composer require laravel/sail --dev
```

Copie o arquivo `.env` de exemplo e edite a senha do banco de dados:

```bash
cp .env.example .env
```

No arquivo `.env`, defina a senha do banco:

```dotenv
DB_PASSWORD=password
```

Instale o Sail com suporte ao MySQL:

```bash
php artisan sail:install
```

Durante a instalação, selecione a opção `mysql` quando solicitado.

Suba os containers do ambiente com:

```bash
./vendor/bin/sail up -d
```

Instale as dependências do projeto:

```bash
./vendor/bin/sail composer install
```

Remova os arquivos de migração duplicados relacionados ao Passport:

```bash
rm database/migrations/*create_oauth*_table.php
```

Instale o Passport:

```bash
./vendor/bin/sail artisan passport:install
```

Execute as migrações:

```bash
./vendor/bin/sail artisan migrate:fresh
```

Gere a chave da aplicação:

```bash
./vendor/bin/sail artisan key:generate
```

Crie um cliente de acesso pessoal para tokens:

```bash
./vendor/bin/sail artisan passport:client --personal
```

Importe os dados de exemplo no banco:

```bash
./vendor/bin/sail mysql laravel < mock-data.sql
```

Após a instalação, a aplicação estará acessível em:

```
http://localhost
```
