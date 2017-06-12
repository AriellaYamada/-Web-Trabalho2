Alunos:
Ariella Yamada Brambila				8937034
Arnaldo Lopes Stanzani				8937510
Guilherme Silva dos Anjos			8936839
Rodrigo de Andrade Santos Weigert	8937503

Para a parte 2 do trabalho alteramos a interface criada na parte 1 para utilizar o framework bootstrap, de maneira a obter um melhor resultado final de interface. Tentamos seguir o padr�o definido na primeira parte, mas algumas informa��es podem estar organizadas de maneira diferente nas telas. 

A p�gina inicial da aplica��o � index.html, e possui informa��es b�sicas da pet shop, al�m de links para as principais fun��es, como a loja e agendamento de servi�os. Al�m disso, h� a �rea destinada a login, em que existem dois usu�rios exemplo. O primeiro, um usu�rio comum, possui como login "usuario1" e senha "1234". O segundo, � administrador, e possui "admin" como login e "admin" como senha.

Ao entrar como usu�rio comum, existe uma dashboard em que � poss�vel visualizar e agendar servi�os, visualizar e cadastrar pets, al�m de visualizar e alterar as informa��es de seu perfil.

Ao entrar como administrador, tamb�m existe uma dashboard, com informa��es sobre os pr�ximos servi�os agendados na petshop, permitindo a busca e cadastro de novos servi�os, busca e cadastro de usu�rios, al�m das informa��es do administrador.

A partir da tela index.html, tamb�m � poss�vel ter acesso � loja, onde o usu�rio pode visualizar as informa��es do produto e adicion�-los ao carrinho, podendo ent�o fazer o checkout das suas compras quando desejar.

Descri��o dos arquivos submetidos:

Arquivos html:
	index.html: P�gina inicial do pet shop, permite acesso �s funcionalidades do sistema.
	area_usuario.html: P�gina inicial para usu�rios, assim que os usu�rios se logam no sistema eles s�o direcionados a esta p�gina.
	area_adm.html: P�gina inicial do administrador do sistema, ao se logar o administrador v� essa p�gina.
	loja.html: P�gina da loja do pet shop, possui as informa��es dos produtos e permite a compra dos mesmos.
	carrinho.html: P�gina referente ao carrinho de compras do usu�rio, o usu�rio adiciona produtos ao carrinho na loja, e quando desejar finalizar a compra ele acessa essa tela.

Arquivos ts (Pasta ts):
	Arquivos typescript com l�gicas espec�ficas para cada tela html (index.ts, area_usuario.ts, area_adm.ts, loja.ts, carrinho.ts), al�m do arquivo Server.ts, que cont�m a "simula��o" do servidor.
	Arquivos javascript e sourcemap gerados pela compila��o do typescript
	Arquivo makefile para compila��o dos arquivos typescript

Pasta css:
	Cont�m arquivos de estilo para as p�ginas html.

Pasta js:
	Cont�m arquivos js inclu�dos no projeto.

Pastas img e images:
	Possuem imagens que s�o usadas no site.

Pasta fonts:
	Possui fontes de texto.

Descri��o dos testes realizados:

	Testes de login:
		Foram realizados testes para avaliar a funcionalidade do login.
		Ent�o, � poss�vel logar como usu�rio comum (usuario1) e como adm (admin), como descrito acima, corretamente.

	Testes de cadastro:
		Foram realizados testes para avaliar a funcionalidade dos diversos cadastros presentes no site, como cadastro de pets, usu�rios, produtos e servi�os.
		Atrav�s destes testes constatamos que os cadastros est�o funcionando corretamente, pois ao realizar o cadastro, o item cadastrado passa a aparecer junto com os outros itens dentro do site. 

	Testes de compra:
		Foram realizados teste para avaliar a funcionalidade do carrinho, ou seja, se todos os produtos que o usu�rio adiciona ao carrinho realmente aparecem no carrinho, al�m de refletir o valor correto dos produtos e a soma total.
		Ap�s diversos testes percebemos que o carrinho mostra corretamente as informa��es relativas aos produtos que o usu�rio adicionou.


