## Desafio Corelab:

Aqui eu vou explicar detalhadamente o que foi feito no projeto.

### Backend
O Backend foi feito em Node.js, e utilizei o framework Express para criar as rotas da API. O Backend foi separado em sub-diretórios para uma melhor organização do código e uma manutenção mais simples. Para armazenar os dados foi utilizado o banco de de dados MongoDB em conjunto com a biblioteca mongoose, a chave do banco de dados está protegida no arquivo ".env", além de ter um ".env.example" para outra pessoas poderem utilizar o código. Basta dar um "npm start";

Foi utilizado o EsLint para uma melhor organização do código, e também foi utilizado o Dockerfile, para encapsular o projeto e evitar erros de mudança de ambiente.

### Frontend
O Frontend foi feito com ReactJs, obedecendo a estrutura básica do React, e mantendo o código organizado com o EsLint. Durante a contrução do Frontend a experiência do usuário e a legibilidade do código foi o ponto mais levado em consideração, por isso usei uma estrutura simples para realizar futuras manutenções, além de não ter usado muitas bibliotecas para facilitar no entendimento do código. Como foi dito, a experiência do usuário foi algo que pesou bastante durante o desenvolvimento, então deixei tudo o mais intuitivo possível, e também agradável. Fiz todas as tratativas para a página não ficar recarregando após fazer uma solicitação ao Backend, sendo assim, tudo é mostrado em tempo real para o usuário, sem precisar atualizar a página.

### O layout
O Layout do projeto foi feito da forma mais fiel possível ao mockup, mas adaptei algumas partes do layout para uma melhor experiência do usuário. O layout ficou agradavél e responsivo para todos os dispositivos.
Explicação da interface:

 • Logo acima na nav, podemos filtrar as tarefas pelo título e pelas cores, tudo atualiza automaticamente, então o botão de pesquisa acabou ficando obsoleto, mas eu o deixei na interface para manter a fidelidade ao mockup original.

 • Abaixo da nav, temos um card para adicionar a task, onde o usuário pode escrever a sua nota, adicionar o título e marcar como favorito, após isso é só dar um Enter que a tarefa será criada.

 • Por fim, temos o container das notas, onde são exibidas e filtradas de acordo com a ordem da postagem e o grau de importância ( As favoritas aparecem primeiro ). Na parte superior do card de visualização das notas o usuário pode definir a nota como favorita ou remove-la dos favoritos, na parte inferior, temos as opções de edição, onde o usuário pode escolher editar o conteúdo, mudar a cor ou excluir a nota.

### O projeto conta com as seguintes funcionalidades:

1. Os usuários são capazes de criar, ler, atualizar e excluir itens de tarefas usando a API.
2. Os usuários podem marcar um item como favorito.
3. Os usuários podem definir uma cor para cada item de tarefa.
4. O front-end do React exibe a lista de tarefas do usuário de maneira responsiva e visualmente atraente, com a capacidade de filtrar por itens e cores favoritos.
5. Os itens favoritos são exibidos no topo da lista.

### Conclusão

Acredito que o projeto está completamente de acordo com os requisitos, e funcionando com extrema agilidade. O Frontend está hospedado na plataforma Netlify e o Backend no Back4App.