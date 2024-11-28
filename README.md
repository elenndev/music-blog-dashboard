# Dashboard
Base do Dashboard utilizado no Blog [Music Archive](https://music-archive-blog.vercel.app).

# Funcionalidades
- Leitura e gerenciamento de publicações e rascunhos.
- Criação automatizada de `iframe`: Ao invés de ter que acessar o spotify e ir em "incorporar playlist", basta fornecer o link de compartilhamento normal da playlist que ele será formatado e guarrtado no formato correto de um `embed`.
- Interação com a API do Spotify: No dashboard, o adm pode buscar um albúm pelo nome e assim definir o albúm em destaque que é renderizado na página inicial do blog.

# Utilização
- Siga o envExample para fornecer as variáveis de ambiente que são necessárias.
- Para utilizar a funcionalidade do albúm do Spotify, é necessário que você crie um Web API do spotify, é bem simples e eles fornecem uma [documentação com o passo a passo](https://developer.spotify.com/documentation/web-api).

Caso queira verificar como utilizo esse dashboard de forma completa com a minha aplicação web, [confira a documentação do front do blog](https://github.com/elenndev/music-archive.git) e do [backend](https://github.com/elenndev/music-archive-server.git)


## Middleware
Ao acessar rotas protegidas e pra fazer requisições de funções de administração, é enviado para o backend o cookie que contém o token que será usado para as verificações.  
O código espera que em caso de sucesso, o backend retorne:  
```javascript
    {"message": "Token verificado",
    "status_code": 200}
```

## Publicações e rascunhos
O tipo do objeto **Post** que será recebido do backend, pode ser verificado no arquivo `InterfacePost`:
```javascript
    interface Model_Post {
    _id: string; 
    cover: string;
    cover_description: string;
    title: string;
    content: string;
    created_at: string;
}
```

## Fast Infos
Os dados maiores são as postagens/rascunhos, mas para lidar com as informações mais curtas, nesse caso, o albúm e a playlist em destaque, as requisições dessas 2 são feitas pra mesma endpoint, mudando somente o parâmetro que será enviado nessa requisição, então o backend vai lidar com esse parâmetro `info_name` pra retornar os dados solicitados:  
```javascript
    // acessando album salvo
    const response = await axios.get(`${SERVER_URL}/fast-infos`,{
        params: {info_name: "week_album"}
    })

    // acessando playlist
    const response = await axios.get(`${SERVER_URL}/fast-infos`, {
            params: {info_name: "featured_playlist"}
        })
```

Nessa requisição o frontend espera que o backend retorne algo como:   
```javascript
    {"info_name": "featured_playlist ou week_album",
    "text_value": "link da playlist ou id spotify do album"}
```

### Spotify Album
O "albúm" que é enviado e recebido entre frontend e backend do blog aqui, é na verdade um **URI do albúm**, ou seja, o identificador único que será usado ao fazer requisições especificamente pra API do spotify e ai sim será retornad o objeto albúm no formato que será usado pra renderizar no html. 


