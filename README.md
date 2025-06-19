- Primeiramente acesse no terminar a pasta "app-ava-store-master" rode o comando npm install.
- Abra o AndroidStudio e emule um dispositivo móvel.
- Rode o comando no terminar(quarantido que esta na mesma pasta "app-ava-store-master") npx expo start.
- Depois de rodar o comando e o AndroidStudio estiver emulando um dispositivo móvel, aperte "a" para abrir o projeto no emulador.
- Então é só testar as funcionalidades do projeto.

Primeiramente temos uma tela de login a qual está sendo utilizado dados mocados(e-mail: ddm@gmail.com, senha: 123456), depois de efetuar o login entramos na tela de Menu aqual temos uma FlatList para mostrar todos
  os produtos que estão cadastrados juntamente com seus dados(nome, preço, qtdStock e categoria) e botões "produtos", "carregar" e "sair",o botão "carregar" tem o objetivo de recarregar a lista dos produtos, o botão
  "sair" tem o objetivo de voltar para a tela de login e por final o botão "produtos" que direciona para a tela de produtos. A tela de produtos tem campos para preencher com os dados necessarios para efetuar um cadastro,
  juntamente com um botão chamado "cadastrar" que chama a função que efetua o cadastro, tambem tem o botão "carregar" que tem a mesma funcionalidade do botão com o mesmo nome na tela de menu e por fim um botão chamado
  "voltar ao menu" que redireciona para a tela de menu, com tudo tem uma FlatListque mostra o nome, preço e contem dois botões um deles é o "excluir" que faz a exclusão do produto(todos os produtos tem este botão), então
  vem o botão de "alterar" que redireciona para a tela de alteração passando osdados do produto e então chegamos na tela de alteração que tem campos já preenchidos com os dados do produto, com tudo tem um botão chamado 
  "salvar" que efetua a alteração dos dados e redireciona para a tela de produtos e assim se passa por todas as telas feitas.
