Alunos:
Ariella Yamada Brambila				8937034
Arnaldo Lopes Stanzani				8937510
Guilherme Silva dos Anjos			8936839
Rodrigo de Andrade Santos Weigert	8937503

Para a parte 2 do trabalho alteramos a interface criada na parte 1 para utilizar o framework bootstrap, de maneira a obter um melhor resultado final de interface. Tentamos seguir o padrão definido na primeira parte, mas algumas informações podem estar organizadas de maneira diferente nas telas. 

A página inicial da aplicação é index.html, e possui informações básicas da pet shop, além de links para as principais funções, como a loja e agendamento de serviços. Além disso, há a área destinada a login, em que existem dois usuários exemplo. O primeiro, um usuário comum, possui como login "usuario1" e senha "1234". O segundo, é administrador, e possui "admin" como login e "admin" como senha.

Ao entrar como usuário comum, existe uma dashboard em que é possível visualizar e agendar serviços, visualizar e cadastrar pets, além de visualizar e alterar as informações de seu perfil.

Ao entrar como administrador, também existe uma dashboard, com informações sobre os próximos serviços agendados na petshop, permitindo a busca e cadastro de novos serviços, busca e cadastro de usuários, além das informações do administrador.

A partir da tela index.html, também é possível ter acesso à loja, onde o usuário pode visualizar as informações do produto e adicioná-los ao carrinho, podendo então fazer o checkout das suas compras quando desejar.

Descrição dos arquivos submetidos:

Arquivos html:
	index.html: Página inicial do pet shop, permite acesso às funcionalidades do sistema.
	area_usuario.html: Página inicial para usuários, assim que os usuários se logam no sistema eles são direcionados a esta página.
	area_adm.html: Página inicial do administrador do sistema, ao se logar o administrador vê essa página.
	loja.html: Página da loja do pet shop, possui as informações dos produtos e permite a compra dos mesmos.
	carrinho.html: Página referente ao carrinho de compras do usuário, o usuário adiciona produtos ao carrinho na loja, e quando desejar finalizar a compra ele acessa essa tela.

Arquivos ts (Pasta ts):
	Arquivos typescript com lógicas específicas para cada tela html (index.ts, area_usuario.ts, area_adm.ts, loja.ts, carrinho.ts), além do arquivo Server.ts, que contém a "simulação" do servidor.
	Arquivos javascript e sourcemap gerados pela compilação do typescript
	Arquivo makefile para compilação dos arquivos typescript

Pasta css:
	Contém arquivos de estilo para as páginas html.

Pasta js:
	Contém arquivos js incluídos no projeto.

Pastas img e images:
	Possuem imagens que são usadas no site.

Pasta fonts:
	Possui fontes de texto.

Descrição dos testes realizados:

	Testes de login:
		Foram realizados testes para avaliar a funcionalidade do login.
		Então, é possível logar como usuário comum (usuario1) e como adm (admin), como descrito acima, corretamente.

	Testes de cadastro:
		Foram realizados testes para avaliar a funcionalidade dos diversos cadastros presentes no site, como cadastro de pets, usuários, produtos e serviços.
		Através destes testes constatamos que os cadastros estão funcionando corretamente, pois ao realizar o cadastro, o item cadastrado passa a aparecer junto com os outros itens dentro do site. 

	Testes de compra:
		Foram realizados teste para avaliar a funcionalidade do carrinho, ou seja, se todos os produtos que o usuário adiciona ao carrinho realmente aparecem no carrinho, além de refletir o valor correto dos produtos e a soma total.
		Após diversos testes percebemos que o carrinho mostra corretamente as informações relativas aos produtos que o usuário adicionou.


