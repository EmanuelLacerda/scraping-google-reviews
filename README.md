<h1 align="center" style="font-weight: bold;">Scraping Google Reviews 💻</h1>
<p align="center">
  <img src="https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white"></img>
  <img src="https://img.shields.io/badge/Puppeteer-white.svg?style=for-the-badge&logo=Puppeteer&logoColor=black"></img>
  <img src="https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray"></img>
  <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white"></img>
</p>
<p align="center">
  <a href="#tech">Tecnologias usadas</a> • 
  <a href="#intro">Introdução</a> •
  <a href="#api-endpoints">API Endpoints</a> •
  <a href="#projec-actors">Autores</a>
</p>
<p align="center">
    <b>Um projeto que faz scraping do Google Reviews automaticamente com serviços AWS.</b>
</p>


<h2 id="tech">📦 Tecnologias usadas:</h2>

- [Django](https://www.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Axios](https://axios-http.com/)
- [Puppeteer](https://pptr.dev/)
- [Moment](https://momentjs.com/)
- **Serviços AWS:**
  - [AWS Lambda](https://docs.aws.amazon.com/lambda/)
  - [AWS SQS](https://docs.aws.amazon.com/sqs/)
  - [AWS RDS](https://docs.aws.amazon.com/rds/)

<h2 id="intro">🔥 Introdução:</h2>

<h3>⚙️ Pré-requisitos:</h3>

Você precisa ter instalado na sua máquina as seguintes tecnologias nas exatas versões apontadas abaixo:
- Serverless Framework V4
- Node 20.x
- Python 3.12

*Obs.: Se quiser, você pode usar o Node ou o Python em versões diferentes, mas, lembre-se de ajustar a versão no serverless.yml dos microserviços. Além disto, dependendo de qual versão será utilizada, avalie se não precisa alterar algo no código.

<h3>🔨 Guia de instalação:</h3>

Para instalar este projeto, acesse [este link](https://github.com/EmanuelLacerda/scraping-google-reviews/blob/main/installation-guide.md) ou acesse o arquivo "installation-guide.md" presente na raiz deste repositório.

Após instalar o projeto, você não precisa executa ele, pois ele funciona de maneira automática. Você apenas precisa adicionar os business que devem passar pelo scraping. Vejo o tópico "API Endpoints" para saber qual endpoint utilizar para fazer esta adição.

<h2 id="api-endpoints">⚙️ API Endpoints</h2>

A API provém os seguintes endpoints:

| rota               | descrição                                          
|----------------------|-----------------------------------------------------
| <kbd>GET /business</kbd>     | Pega a lista de todos os business. [Ver detalhes](#get-all-business)
| <kbd>GET /business/{businessId}/</kbd>     | Pega um business específico por ID. [Ver detalhes](#get-business)
| <kbd>POST /business</kbd>     | Registra um novo business [Ver detalhes](#post-business)


<h3 id="get-all-business">GET /business</h3>

<h4>RESPONSE:</h4>

```
[
  {
    "id": 1,
    "name": "Empório do Mate",
    "zipcode": "04544-000",
    "address": "Rua Mateus Leme",
    "number": 1200,
    "complement": "",
    "area": "Pinheiros",
    "state": "São Paulo",
    "city": "São Paulo",
    "phone_number": "(11) 3031-9876",
    "url": "https://www.google.com/maps/place/Emp%C3%B3rio+do+Mate/@-23.5609121,-46.6533211,17z/data=!3m1!4b1!4m5!3m4!1s0x9de4ce02c10f2b:0x8f3b22c88e9878c8!8m2!3d-23.5610032!4d-46.6532302",
    "general_rating": "4.7",
    "total_reviews": 214,
    "created_at": "2024-11-28T10:15:32.123456Z",
    "active": true,
    "reviews": []
  },
  {
    "id": 2,
    "name": "Feira Nordestina da Ana",
    "zipcode": "50070-000",
    "address": "Avenida Conde da Boa Vista",
    "number": 1500,
    "complement": "Loja 20",
    "area": "Centro",
    "state": "Recife",
    "city": "Pernambuco",
    "phone_number": "(81) 3224-1122",
    "url": "https://www.google.com/maps/place/Feira+Nordestina+da+Ana/@-8.0580121,-34.8812345,17z/data=!3m1!4b1!4m5!3m4!1s0x7acc59cbef02c40f:0x2f4b2f3d2f1d2f9e!8m2!3d-8.0580632!4d-34.8811436",
    "general_rating": "4.8",
    "total_reviews": 987,
    "created_at": "2024-11-29 14:22:01.789012Z",
    "active": true,
    "reviews": []
  }
]
```

<h3 id="get-business">GET /business/1/</h3>

<h4>RESPONSE:</h4>

```
{
  "id": 1,
  "name": "Empório do Mate",
  "zipcode": "04544-000",
  "address": "Rua Mateus Leme",
  "number": 1200,
  "complement": "",
  "area": "Pinheiros",
  "state": "São Paulo",
  "city": "São Paulo",
  "phone_number": "(11) 3031-9876",
  "url": "https://www.google.com/maps/place/Emp%C3%B3rio+do+Mate/@-23.5609121,-46.6533211,17z/data=!3m1!4b1!4m5!3m4!1s0x9de4ce02c10f2b:0x8f3b22c88e9878c8!8m2!3d-23.5610032!4d-46.6532302",
  "general_rating": "4.7",
  "total_reviews": 214,
  "created_at": "2024-11-28T10:15:32.123456Z",
  "active": true,
  "reviews": []
}
```

<h3 id="post-business">POST /business</h3>

<h4>REQUEST:</h4>

```
{
  "name": "Mercadinho da Amizade",
  "zipcode": "58780-000",
  "address": "Rua Dede do Cantinho",
  "number": 123,
  "complement": "",
  "area": "Centro",
  "state": "Paraíba",
  "city": "Itaporanga",
  "phone_number": "(83) 3531-2287",
  "url": "https://www.google.com/maps/place/Mercadinho+da+Amizade,+Rua+Dede+do+Cantinho+123,+Centro,+Itaporanga,+Para%C3%ADba/@-7.319422,-37.455178,17z/data=!4m8!1m2!2m1!1sMercadinho+da+Amizade!3m1!1s0x0:0x0!5m2!1s2024-12-01T11:46:49.244Z!2sMercadinho%20da%20Amizade",
  "general_rating": 4.3,
  "total_reviews": 130,
  "active": true
}
```

<h4>RESPONSE:</h4>

```
{
    "id": 3
    "name": "Mercadinho da Amizade",
    "zipcode": "58780-000",
    "address": "Rua Dede do Cantinho",
    "number": 123,
    "complement": "",
    "area": "Centro",
    "state": "Paraíba",
    "city": "Itaporanga",
    "phone_number": "(83) 3531-2287",
    "url": "https://www.google.com/maps/place/Mercadinho+da+Amizade,+Rua+Dede+do+Cantinho+123,+Centro,+Itaporanga,+Para%C3%ADba/@-7.319422,-37.455178,17z/data=!4m8!1m2!2m1!1sMercadinho+da+Amizade!3m1!1s0x0:0x0!5m2!1s2024-12-01T11:46:49.244Z!2sMercadinho%20da%20Amizade",
    "general_rating": "4.30",
    "total_reviews": 130,
    "created_at": "2024-12-01T14:41:22.411102Z",
    "active": true,
    "reviews": []
}
```


<h2 id="projec-actors">👷 Autores</h2>

* Emanuel Lacerda - Desenvolvedor - [@EmanuelLacerda](https://github.com/EmanuelLacerda/)
* Matheus Juvelino - Consultor - [@matheusjuvelino-neon](https://github.com/matheusjuvelino-neon)

