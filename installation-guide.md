<h1>🔨 Guia de instalação:</h1>

<h2>Passo 1: Clone esse repositório</h2>

```bash
git clone git@github.com:EmanuelLacerda/scraping-google-reviews.git
```

<hw>Passo 2: Acesse a pasta do respositório</h2>

```bash
cd scraping-google-reviews
```

<h2>Passo 3: Instale as dependências</h2>

Neste repositório, há 3 diretórios, sendo uma lambda function cada um deles. Devido serem lambda function, eles possuem dependências próprias. Então, você precisa instalar as dependências individualmente. Abaixo segue como fazer para o repositório "scheduler". Repita o mesmo para os outros dois.

**1° Acesse o diretório "scheduler":**

```bash
cd scheduler
```

**2° Execute o "npm install":**

```bash
npm install
```

**3° Volte para a raiz do projeto:**

```bash
cd ..
```

<h2>Passo 04: Faça o deploy da Lambda Function "Server"</h2>

**1° Crie o server/.env a partir do server/.env.examples:**

Ao acessar server/.env.examples você verá o seguinte conteúdo:
```
STATIC_FILES_BUCKET_NAME=
AWS_REGION_NAME=us-east-1
DB_NAME=
DB_USER="postgres"
DB_PASSWORD=
DB_HOST=
DB_PORT=5432
SECRET_KEY=
```

Em "STATIC_FILES_BUCKET_NAME", você deve colocar o nome do bucket do AWS S3 em que ficará os static files desta Lambda Function. Em "SECRET_KEY", coloque a SECRET_KEY que você tiver gerado para a aplicação Django. Exceto por "DB_HOST", no restante das variáveis de ambiente que não tem valor, coloque as informações da Instância PostgreSQL do AWS RDS que utilizada pelo servidor.

**2° Acesse o diretório "server":**

```bash
cd server
```

**3° Faça o deploy para a AWS:**


```bash
serverless deploy
```

**4° Execute o comando `collectstatic` do Django remotamente via `wsgi manage`:**

```bash
serverless wsgi manage --command "collectstatic --noinput"
```

**5° Copie na variável "DB_HOST" em server/.env a url do host da Instância do PostgreSQL criada no deploy:**

**6° Faça o deploy para a AWS:**

```bash
serverless deploy
```

**7° Execute as migrations:**

```bash
serverless  wsgi manage --command "migrate"
```

**8° Saia do diretório "server":**

```bash
cd ..
```

<h2>Passo 04: Faça o deploy da Lambda Function "Scheduler"</h2>

**1° Crie o scheduler/.env a partir do scheduler/.env.examples:**

Ao acessar scheduler/.env.examples você verá o seguinte conteúdo:
```
BASE_URL_API_V1=
SQS_QUEUE_URL=
SQS_NAME=
```

Em "SQS_NAME", você deve colocar o nome da fila FIFO do AWS SQS para qual serão enviados o id dos business que devem passar pelo scraping. Além disto, você deve colocar em "BASE_URL_API_V1" a URL da API da Lambda Server adicionando "/api/v1/" no final dela. Portanto, o valor de "BASE_URL_API_V1" deve ser algo como "https://lo8963hdj.execute-api.us-east-1.amazonaws.com/stg/api/v1/".

**2° Acesse o diretório "scheduler":**

```bash
cd scheduler
```

**3° Se necessário, altere a periodicidade da execução da lambda function Scheduler:**

Esta lambda function é acionada a cada 10 minutos. Caso você precise que o acionamento dela ocorra em uma periodicidade diferente, ajuste isto antes de fazer o deploy.


**4° Faça o deploy para a AWS:**


```bash
serverless deploy
```

**5° Copie na variável "SQS_QUEUE_URL" em scheduler/.env a url da fila FIFO criada no deploy:**

**6° Saia do diretório "scheduler":**

```bash
cd ..
```


<h2>Passo 04: Faça o deploy da Lambda Function "Scraper"</h2>

**1° Crie o scraper/.env a partir do scraper/.env.examples:**

Ao acessar scraper/.env.examples você verá o seguinte conteúdo:
```
BASE_URL_API_V1=
SQS_ARN=
```

Em "SQS_ARN", você deve colocar o ARN da fila FIFO do AWS SQS para qual serão enviados o id dos business que devem passar pelo scraping. Além disto, você deve colocar em "BASE_URL_API_V1" a URL da API da Lambda Server adicionando "/api/v1/" no final dela. Portanto, o valor de "BASE_URL_API_V1" deve ser algo como "https://lo8963hdj.execute-api.us-east-1.amazonaws.com/stg/api/v1/".

**2° Acesse o diretório "scraper":**

```bash
cd scraper
```

**3° Se necessário, altere o timeout da lambda function Scheduler:**

Esta lambda function tem um timeout de 5 minutos. Caso você precise que o timeout seja diferente, ajuste isto antes de fazer o deploy.


**4° Faça o deploy para a AWS:**

**5° Saia do diretório "scraper":**

```bash
cd ..
```



```bash
serverless deploy
```
