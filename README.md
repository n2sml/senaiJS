# senaiJS
Projeto realizado para o programa de estágio do Instituto SENAI de Inovação em Tecnologia da Informação e Comunicação (ISI-Tics).

## Sobre
Por comodidade, deixei uma versão desse sistema hospedada na web usando Firebase: dê uma olhada em http://nicolasx.ml/

Meu foco neste projeto foi implementar todos os requisitos do desafio, tanto os necessários quanto os extras, os quais consegui com sucesso:

### Design Elegante e Responsivo 
Utilizei Bootstrap para a criação de tabelas, botões e para manter a responsividade do sistema;

### Todas as Informações Oriundas da API 
Todos os dados dos usuários têm como fonte o randomuser.me;

### Projeto no GitHub até 07/01 
Você está lendo ele :) ;

### Conteúdo da Página Inicial 
Consiste em uma tabela com 25 linhas (cada uma sendo um usuário) e 3 colunas (respectivamente seus nomes, endereços de e-mail e telefones);

### Página com Detalhamento de Informações 
Ao selecionar um item da lista, o usuário é redirecionado à uma página com todas as informações solicitadas no desafio;

### Exibição do Mapa com a Localização do Usuário 
No fim da página de detalhamento, implementei um mapa utilizando os dados fornecidos pelo randomuser.me indicando a sua localização.

### Tela com Gráficos Sobre os Usuários
No rodapé da tela inicial da aplicação, há uma opção que leva o usuário à uma nova página, exibindo gráficos informando estatísticas sobre os usuários coletados do site, de acordo com o solicitado no desafio.

### Filtrar Usuário 
Na tela principal da aplicação, há um campo de texto onde podem ser inseridos dados para filtrar tanto o nome quanto o endereço de e-mail de um usuário específico.

### Tratamento de Erro 
Caso a página principal da aplicação seja acessada Offline ou com esteja enfrentando algum problema de conexão com o randomuser.me, o mesmo exibe um aviso de erro e tenta, após uma contagem regressiva, recarregar a página.

## Bibliotecas e Frameworks 
Esse projeto foi desenvolvido utilizando as seguintes bibliotecas e frameworks:
* [Bootstrap 4](https://getbootstrap.com/) - Utilizada para gerenciar a responsividade com o "Grid Layout", botões e tabelas;
* [Leaflet](https://leafletjs.com/) - Utilizada para gerar mapas (parte opcional do desafio);
* [CanvasJS](https://canvasjs.com/) - Utilizada para gerar gráficos (parte opcional do desafio);

## Instalando
Como o projeto foi todo desenvolvido utilizando Javascript, CSS e HTML, um simples git clone no repositório deixará disponível todo o conteúdo necessário para a execução do sistema. Para iniciar, basta simplesmente abrir o arquivo index.html.

## Autor - 
Nícolas Soares da Silva Miguel, estudante de Análise e Desenvolvimento de Sistemas do Instituto Federal de Pernambuco (IFPE).
