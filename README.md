# Pré-requisitos:
Você precisa do Node e NPM para executar esta aplicação. Acesse [este link](https://nodejs.org/en/download/package-manager) para saber como realizar as instalações deles. Após instalar os dois, você vai precisar instalar o Serverless Framework e, em seguida, fazer o login na AWS a partir dele. Você conseguirá saber como fazer tudo isto [neste link](https://www.serverless.com/framework/docs/getting-started)



# Guia de instalação

## Passo 1: Clone esse repositório
```bash
git clone git@github.com:EmanuelLacerda/scraping-google-reviews.git
```

## Passo 2: Acesse a pasta do respositório
```bash
cd scraping-google-reviews
```

## Passo 3: Instale as dependências

Neste repositório, há 3 diretórios, sendo uma lambda function cada um deles. Devido serem lambda function, eles possuem dependências próprias. Então, você precisa instalar as dependências individualmente. Abaixo segue como fazer para o repositório "scheduler". Repita o mesmo para os outros dois.

1° Acesse o diretório "scheduler":
```bash
cd scheduler
```

2° Execute o "npm install"
```bash
npm install
```

3° Volte para a raiz do projeto
```bash
cd ..
```

## Passo 3: Crie as variáveis de ambiente

As lambda "scheduler" e "server" precisam de varíaveis de ambiente para serem executadas. Portanto, no diretório de cada uma delas crie um .env.

Em server/.env deve haver as seguintes variáveis de ambiente:
- STATIC_FILES_BUCKET_NAME: Nome do S3 Bucket em que ficará os arquivos estáticos
- AWS_REGION_NAME: Nome da região da AWS(ex.: us-east-1)
- DB_NAME: Nome da instância do banco AWS RDS PostgreSQL 
- DB_USER: Nome do usuário da instância do banco AWS RDS PostgreSQL
- DB_PASSWORD: Master password do usuário da instância do banco AWS RDS PostgreSQL
- DB_HOST: Url da instância do banco AWS RDS PostgreSQL
- DB_PORT:Porta da instância do banco AWS RDS PostgreSQL
- SECRET_KEY: SECRET_KEY utilizada pelo Django

Em scheduler/.env deve haver as seguintes variáveis de ambiente:
- SNS_TOPIC_ARN: ARN do tópico SNS que invoca a lambda scraper

## Passo 4: Faça o deploy das lambda function

Acesse cada um dos 3 diretórios e em cada um execute o comando abaixo para fazer o deploy da lambda para a AWS:
```bash
serverless deploy
```
