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
  <a href="#projec-actors">Autores</a> •
  <a href="#licenca">Licença</a> •
  <a href="#contact">Contato</a>
</p>
<p align="center">
    <b>Um projeto que faz de maneira automática e periódica o scraping do Google Reviews utilizando serviços AWS.</b>
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

Após instalar o projeto, você não precisa executa ele, pois ele funciona de maneira automática. Você apenas precisa adicionar os business que devem passar pelo scraping. Vejo o tópico <a href="#api-endpoints">API Endpoints</a> para saber qual endpoint utilizar para fazer esta adição.

<h2 id="api-endpoints">⚙️ API Endpoints</h2>

A API provém os seguintes endpoints:

| rota               | descrição                                          
|----------------------|-----------------------------------------------------
| <kbd>GET /business</kbd>     | Pega a lista de todos os business. [Ver detalhes](#get-all-business)
| <kbd>GET /business/{businessId}/</kbd>     | Pega um business específico por ID. [Ver detalhes](#get-specific-business)
| <kbd>POST /business</kbd>     | Registra um novo business [Ver detalhes](#post-business)
| <kbd>PUT /business/{businessId}/</kbd>     | Edita os dados de um business específico por ID
| <kbd>PATCH /business/{businessId}/</kbd>     | Edita os dados de um business específico por ID
| <kbd>DELETE /business/{businessId}/</kbd>     | Remove um business específico por ID
| <kbd>GET /business/{businessId}/reviews/</kbd>     | Pega todas as avaliações de um business específico por ID. [Ver detalhes](#get-business-all-reviews)
| <kbd>GET /business/{businessId}/reviews/?review_id={reviewId}</kbd>     | Pega uma avalição específica por ID de um business específico por ID. [Ver detalhes](#get-business-review)
| <kbd>GET /reviews</kbd>     | Pega a lista de todos as avaliações. [Ver detalhes](#get-all-reviews)
| <kbd>GET /reviews/{reviewId}/</kbd>     | Pega uma avaliação específica por ID. [Ver detalhes](#get-specific-review)
| <kbd>POST /reviews</kbd>     | Registra uma nova avaliação [Ver detalhes](#post-review)
| <kbd>PUT /reviews/{businessId}/</kbd>     | Edita os dados de uma avaliação específica por ID
| <kbd>PATCH /reviews/{businessId}/</kbd>     | Edita os dados de uma avaliação específica por ID
| <kbd>DELETE /reviews/{businessId}/</kbd>     | Remove uma avaliação específica por ID


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
    "total_reviews": 3,
    "created_at": "2024-11-28T10:15:32.123456Z",
    "active": true,
    "reviews": [
      1,
      2,
      3
    ]
  },
  {
    "id": 2,
    "name": "Feira Nordestina da Ana",
    "zipcode": "50070-000",
    "address": "Avenida Conde da Boa Vista",
    "number": 1500,
    "complement": "Loja 20",
    "area": "Centro",
    "state": "Pernambuco",
    "city": "Recife",
    "phone_number": "(81) 3224-1122",
    "url": "https://www.google.com/maps/place/Feira+Nordestina+da+Ana/@-8.0580121,-34.8812345,17z/data=!3m1!4b1!4m5!3m4!1s0x7acc59cbef02c40f:0x2f4b2f3d2f1d2f9e!8m2!3d-8.0580632!4d-34.8811436",
    "general_rating": "4.8",
    "total_reviews": 3,
    "created_at": "2024-11-29 14:22:01.789012Z",
    "active": true,
    "reviews": [
      4,
      5,
      6
    ]
  }
]
```

<h3 id="get-specific-business">GET /business/1/</h3>

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
  "total_reviews": 3,
  "created_at": "2024-11-28T10:15:32.123456Z",
  "active": true,
  "reviews": [[
      1,
      2,
      3
  ]
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
  "area": "Centro",
  "city": "Itaporanga",
  "state": "Paraíba",
  "phone_number": "(83) 3531-2287",
  "url": "https://www.google.com/maps/place/Mercadinho+da+Amizade,+Rua+Dede+do+Cantinho+123,+Centro,+Itaporanga,+Para%C3%ADba/@-7.319422,-37.455178,17z/data=!4m8!1m2!2m1!1sMercadinho+da+Amizade!3m1!1s0x0:0x0!5m2!1s2024-12-01T11:46:49.244Z!2sMercadinho%20da%20Amizade"
}
```

<h4>RESPONSE:</h4>

```
{
    id: 3
    name": 'Mercadinho da Amizade',
    zipcode: '58780-000',
    address: 'Rua Dede do Cantinho',
    number: 123,
    complement: '',
    area: 'Centro',
    state: 'Paraíba",
    city: 'Itaporanga",
    phone_number: '(83) 3531-2287',
    url: 'https://www.google.com/maps/place/Mercadinho+da+Amizade,+Rua+Dede+do+Cantinho+123,+Centro,+Itaporanga,+Para%C3%ADba/@-7.319422,-37.455178,17z/data=!4m8!1m2!2m1!1sMercadinho+da+Amizade!3m1!1s0x0:0x0!5m2!1s2024-12-01T11:46:49.244Z!2sMercadinho%20da%20Amizade',
    general_rating: '0.00',
    total_reviews: 0,
    created_at: '2024-12-01T14:41:22.411102Z',
    active: true,
    reviews: []
}
```

<h3 id="get-business-all-reviews">GET /business/2/reviews/</h3>

<h4>RESPONSE:</h4>

```
[
  {
    "id": 4,
    "created_at": "2024-12-01T22:00:00.000Z",
    "update_at": "2024-12-01T22:00:00.000Z",
    "active": true,
    "profile_picture": "https://lh3.googleusercontent.com/a-/ALV-UjU31-KNTrKmY_Gq2r6BFT4OD-JwUTYOrQB58s0Tzlamp-hB9lNi=w36-h36-p-rp-mo-ba2-br100",
    "name": "João Silva",
    "rating": "4.75",
    "approximateDate": "2024-11-15T15:30:00.000Z",
    "description": "A comida da Feira Nordestina da Ana é simplesmente deliciosa! O tempero é incrível e me lembrou muito da culinária caseira do nordeste. Recomendo o baião de dois e o bolo de rolo. O atendimento foi impecável, e o ambiente acolhedor me fez sentir em casa.",
    "business": 2
  },
  {
    "id": 5,
    "created_at": "2024-12-01T22:15:00.000Z",
    "update_at": "2024-12-01T22:15:00.000Z",
    "active": true,
    "profile_picture": "https://lh3.googleusercontent.com/a-/ALV-UjU31-KNTrKmY_Gq2r6BFT4OD-JwUTYOrQB58s0Tzlamp-hB9lNi=w36-h36-p-rp-mo-ba2-br100",
    "name": "Mariana Oliveira",
    "rating": "4.50",
    "approximateDate": "2024-11-20T14:00:00.000Z",
    "description": "Gostei muito da experiência na Feira Nordestina da Ana! A carne de sol estava no ponto certo e o feijão tropeiro é o melhor que já comi. Só acho que poderiam melhorar um pouco a organização das mesas. Fora isso, foi uma ótima experiência!",
    "business": 2
  },
  {
    "id": 6,
    "created_at": "2024-12-01T22:30:00.000Z",
    "update_at": "2024-12-01T22:30:00.000Z",
    "active": true,
    "profile_picture": "https://lh3.googleusercontent.com/a-/ALV-UjU31-KNTrKmY_Gq2r6BFT4OD-JwUTYOrQB58s0Tzlamp-hB9lNi=w36-h36-p-rp-mo-ba2-br100",
    "name": "Carlos Mendes",
    "rating": "5.00",
    "approximateDate": "2024-11-25T18:45:00.000Z",
    "description": "Que lugar maravilhoso! A Feira Nordestina da Ana tem um cardápio autêntico e cheio de sabores inesquecíveis. Experimentei o cuscuz com carne seca e foi simplesmente divino. Além disso, a equipe é super simpática. Voltarei com certeza!",
    "business": 2
  }
]
```

<h3 id="get-business-review">GET /business/2/reviews/?review_id=5</h3>

<h4>RESPONSE:</h4>

```
 {
  "id": 5,
  "created_at": "2024-12-01T22:15:00.000Z",
  "update_at": "2024-12-01T22:15:00.000Z",
  "active": true,
  "profile_picture": "https://lh3.googleusercontent.com/a-/ALV-UjU31-KNTrKmY_Gq2r6BFT4OD-JwUTYOrQB58s0Tzlamp-hB9lNi=w36-h36-p-rp-mo-ba2-br100",
  "name": "Mariana Oliveira",
  "rating": "4.50",
  "approximateDate": "2024-11-20T14:00:00.000Z",
  "description": "Gostei muito da experiência na Feira Nordestina da Ana! A carne de sol estava no ponto certo e o feijão tropeiro é o melhor que já comi. Só acho que poderiam melhorar um pouco a organização das mesas. Fora isso, foi uma ótima experiência!",
  "business": 2
}
```

<h3 id="get-all-reviews">GET /reviews</h3>

<h4>RESPONSE:</h4>

```
[
  {
    "id": 1,
    "created_at": "2024-12-01T23:59:54.000Z",
    "update_at": "2024-12-01T23:59:54.000Z",
    "active": true,
    "profile_picture": "https://lh3.googleusercontent.com/a-/ALV-UjU31-KNTrKmY_Gq2r6BFT4OD-JwUTYOrQB58s0Tzlamp-hB9lNi=w36-h36-p-rp-mo-ba2-br100",
    "name": "Carlos Silva",
    "rating": "4.50",
    "approximateDate": "2024-11-20T12:45:00.000Z",
    "description": "Lugar maravilhoso! O Empório do Mate tem uma atmosfera acolhedora, com um atendimento excepcional. O mate com guaraná é simplesmente perfeito, recomendo muito!",
    "business": 1
  },
  {
    "id": 2,
    "created_at": "2024-12-01T23:59:54.000Z",
    "update_at": "2024-12-01T23:59:54.000Z",
    "active": true,
    "profile_picture": "https://lh3.googleusercontent.com/a-/ALV-UjU31-KNTrKmY_Gq2r6BFT4OD-JwUTYOrQB58s0Tzlamp-hB9lNi=w36-h36-p-rp-mo-ba2-br100",
    "name": "Fernanda Oliveira",
    "rating": "3.75",
    "approximateDate": "2024-11-15T09:30:00.000Z",
    "description": "O Empório do Mate tem boas opções, mas achei o mate um pouco doce demais. No geral, vale a pena pela experiência e pelo ambiente aconchegante.",
    "business": 1
  },
  {
    "id": 3,
    "created_at": "2024-12-01T23:59:54.000Z",
    "update_at": "2024-12-01T23:59:54.000Z",
    "active": true,
    "profile_picture": "https://lh3.googleusercontent.com/a-/ALV-UjU31-KNTrKmY_Gq2r6BFT4OD-JwUTYOrQB58s0Tzlamp-hB9lNi=w36-h36-p-rp-mo-ba2-br100",
    "name": "Mariana Costa",
    "rating": "5.00",
    "approximateDate": "2024-11-10T18:20:00.000Z",
    "description": "Simplesmente incrível! O Empório do Mate superou minhas expectativas. O pão de queijo acompanhado do mate foi a combinação perfeita. Voltarei com certeza!",
    "business": 1
  },
{
    "id": 4,
    "created_at": "2024-12-01T22:00:00.000Z",
    "update_at": "2024-12-01T22:00:00.000Z",
    "active": true,
    "profile_picture": "https://lh3.googleusercontent.com/a-/ALV-UjU31-KNTrKmY_Gq2r6BFT4OD-JwUTYOrQB58s0Tzlamp-hB9lNi=w36-h36-p-rp-mo-ba2-br100",
    "name": "João Silva",
    "rating": "4.75",
    "approximateDate": "2024-11-15T15:30:00.000Z",
    "description": "A comida da Feira Nordestina da Ana é simplesmente deliciosa! O tempero é incrível e me lembrou muito da culinária caseira do nordeste. Recomendo o baião de dois e o bolo de rolo. O atendimento foi impecável, e o ambiente acolhedor me fez sentir em casa.",
    "business": 2
  },
  {
    "id": 5,
    "created_at": "2024-12-01T22:15:00.000Z",
    "update_at": "2024-12-01T22:15:00.000Z",
    "active": true,
    "profile_picture": "https://lh3.googleusercontent.com/a-/ALV-UjU31-KNTrKmY_Gq2r6BFT4OD-JwUTYOrQB58s0Tzlamp-hB9lNi=w36-h36-p-rp-mo-ba2-br100",
    "name": "Mariana Oliveira",
    "rating": "4.50",
    "approximateDate": "2024-11-20T14:00:00.000Z",
    "description": "Gostei muito da experiência na Feira Nordestina da Ana! A carne de sol estava no ponto certo e o feijão tropeiro é o melhor que já comi. Só acho que poderiam melhorar um pouco a organização das mesas. Fora isso, foi uma ótima experiência!",
    "business": 2
  },
  {
    "id": 6,
    "created_at": "2024-12-01T22:30:00.000Z",
    "update_at": "2024-12-01T22:30:00.000Z",
    "active": true,
    "profile_picture": "https://lh3.googleusercontent.com/a-/ALV-UjU31-KNTrKmY_Gq2r6BFT4OD-JwUTYOrQB58s0Tzlamp-hB9lNi=w36-h36-p-rp-mo-ba2-br100",
    "name": "Carlos Mendes",
    "rating": "5.00",
    "approximateDate": "2024-11-25T18:45:00.000Z",
    "description": "Que lugar maravilhoso! A Feira Nordestina da Ana tem um cardápio autêntico e cheio de sabores inesquecíveis. Experimentei o cuscuz com carne seca e foi simplesmente divino. Além disso, a equipe é super simpática. Voltarei com certeza!",
    "business": 2
  }
]
```


<h3 id="get-specific-review">GET /review/1/</h3>

<h4>RESPONSE:</h4>

```
{
  "id": 1,
  "created_at": "2024-12-01T23:59:54.000Z",
  "update_at": "2024-12-01T23:59:54.000Z",
  "active": true,
  "profile_picture": "https://lh3.googleusercontent.com/a-/ALV-UjU31-KNTrKmY_Gq2r6BFT4OD-JwUTYOrQB58s0Tzlamp-hB9lNi=w36-h36-p-rp-mo-ba2-br100",
  "name": "Carlos Silva",
  "rating": "4.50",
  "approximateDate": "2024-11-20T12:45:00.000Z",
  "description": "Lugar maravilhoso! O Empório do Mate tem uma atmosfera acolhedora, com um atendimento excepcional. O mate com guaraná é simplesmente perfeito, recomendo muito!",
  "business": 1
}
```

<h3 id="post-review">POST /reviews</h3>

<h4>REQUEST:</h4>

```
{
    "active": true,
    "profile_picture": "https://lh3.googleusercontent.com/a/ACg8ocKiR7Rgzs8vTA5Dpv5GCqZ_ixYkfRzxd-F-Pr548-3YpdFyug=w36-h36-p-rp-mo-br100",
    "name": "Maria da Silva",
    "rating": "4.35",
    "approximateDate": "2024-11-13T10:12:54.329000Z",
    "description": "Excelente comida e serviço!",
    "business": 2
}
```

<h4>RESPONSE:</h4>

```
{
    "id": 7,
    "created_at": "2024-12-02T12:59:46.624340Z",
    "update_at": "2024-12-02T12:59:46.624367Z",
    "active": true,
    "profile_picture": "https://lh3.googleusercontent.com/a/ACg8ocKiR7Rgzs8vTA5Dpv5GCqZ_ixYkfRzxd-F-Pr548-3YpdFyug=w36-h36-p-rp-mo-br100",
    "name": "Maria da Silva",
    "rating": "4.35",
    "approximateDate": "2024-11-13T10:12:54.329000Z",
    "description": "Excelente comida e serviço!",
    "business": 2
}
```



<h2 id="projec-actors">👷 Autores</h2>

* Emanuel Lacerda - Desenvolvedor - [@EmanuelLacerda](https://github.com/EmanuelLacerda/)
* Matheus Juvelino - Consultor - [@matheusjuvelino-neon](https://github.com/matheusjuvelino-neon)

<h2 id="licenca">📄 Licença</h2>
Esse projeto está sob a licença MIT - acesse os detalhes <a href="https://github.com/EmanuelLacerda/scraping-google-reviews/blob/main/LICENSE">LICENSE.md</a>.

<h2 id="contact">✉️ Contato</h2>
Se tiver alguma dúvida, quiser fazer sugestões, elogios, etc., se sinta livre para entrar em contato comigo por meio de um dos contatos abaixo:

- [in/emanuel-de-souza-lacerda](https://www.linkedin.com/in/emanuel-de-souza-lacerda/)
- emanuelsouzalacerda@gmail.com
