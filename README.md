<h1 align="center" style="font-weight: bold;">Scraping Google Reviews 💻</h1>


<h2>📦 Tecnologias usadas:</h2>

- [Django](https://www.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Axios](https://axios-http.com/)
- [Puppeteer](https://pptr.dev/)
- [Moment](https://momentjs.com/)
- **Serviços AWS:**
  - [AWS Lambda](https://docs.aws.amazon.com/lambda/)
  - [AWS SQS](https://docs.aws.amazon.com/sqs/)
  - [AWS RDS](https://docs.aws.amazon.com/rds/)

<h2>🔥 Introdução:</h2>

<h3>⚙️ Pré-requisitos:</h3>

Você precisa ter instalado na sua máquina as seguintes tecnologias nas exatas versões apontadas abaixo:
- Serverless Framework V4
- Node 20.x
- Python 3.12

*Obs.: Se quiser, você pode usar o Node ou o Python em versões diferentes, mas, lembre-se de ajustar a versão no serverless.yml dos microserviços. Além disto, dependendo de qual versão será utilizada, avalie se não precisa alterar algo no código.

<h3>🔨 Guia de instalação:</h3>

<h4>Passo 1: Clone esse repositório</h4>

```bash
git clone git@github.com:EmanuelLacerda/scraping-google-reviews.git
```

<h4>Passo 2: Acesse a pasta do respositório</h4>

```bash
cd scraping-google-reviews
```

<h4>Passo 3: Instale as dependências</h4>

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

<h4>Passo 04: Faça o deploy da Lambda Function "Server"</h4>

**1° Crie o server/.env a partir do server/.env.examples:**

Ao acessar server/.env.examples você verá o seguinte conteúdo:
```
STATIC_FILES_BUCKET_NAME=
AWS_REGION_NAME=us-east-1
DB_NAME=
DB_USER=postgres
DB_PASSWORD=
DB_HOST=
DB_PORT=5432
```

Em "STATIC_FILES_BUCKET_NAME", você deve colocar o nome do bucket do AWS S3 em que ficará os static files desta Lambda Function. Exceto por "DB_HOST", no restante das variáveis de ambiente que não tem valor, coloque as informações da Instância PostgreSQL do AWS RDS que utilizada pelo servidor.

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

**5° Copiar na variável "DB_HOST" em server/.env a url do host da Instância do PostgreSQL criada no deploy:**

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















