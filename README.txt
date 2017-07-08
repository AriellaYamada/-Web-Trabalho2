Alunos:
Ariella Yamada Brambila				8937034
Arnaldo Lopes Stanzani				8937510
Guilherme Silva dos Anjos			8936839
Rodrigo de Andrade Santos Weigert	8937503

A p�gina inicial da aplica��o � index.html, e possui informa��es b�sicas da pet shop, al�m de links para as principais fun��es, como a loja e agendamento de servi�os. Al�m disso, h� a �rea destinada a login. Inicialmente existem dois usu�rios exemplo. O primeiro, um usu�rio comum, possui como login "usuario1" e senha "1234". O segundo, � administrador, e possui "admin" como login e "admin" como senha. Novos usu�rios podem ser criados pelo admin.

Ao entrar como usu�rio comum, existe uma dashboard em que � poss�vel visualizar e agendar servi�os, visualizar e cadastrar pets, al�m de visualizar e alterar as informa��es de seu perfil.

Ao entrar como administrador, tamb�m existe uma dashboard, com informa��es sobre os pr�ximos servi�os agendados na petshop, permitindo a busca e cadastro de novos servi�os, busca e cadastro de usu�rios, al�m das informa��es do administrador.

Descri��o dos arquivos submetidos:

Arquivos html:
	index.html: P�gina inicial do pet shop, permite acesso �s funcionalidades do sistema.
	area_usuario.html: P�gina inicial para usu�rios, assim que os usu�rios se logam no sistema eles s�o direcionados a esta p�gina.
	area_adm.html: P�gina inicial do administrador do sistema, ao se logar o administrador v� essa p�gina.

server.js: cont�m toda a l�gica do servidor em nodejs com express. O servidor escuta nas portas 8080 (http) e 8081 (https)

package.json: para uso dos comandos npm install (instalar depend�ncias do nodejs do servidor) e npm start (rodar servidor)

Pasta ssl: cont�m dados da chave usada para o servidor https.

Pasta public: cont�m arquivos servidos estaticamente pelo servidor (express).

Pasta public/ts:
	Arquivos typescript com l�gicas espec�ficas para cada tela html (index.ts, area_usuario.ts, area_adm.ts).
	Arquivos javascript e sourcemap gerados pela compila��o do typescript.
	Arquivo Makefile para compila��o dos arquivos typescript.

Pasta public/css:
	Cont�m arquivos de estilo para as p�ginas html.

Pasta public/js:
	Cont�m arquivos js inclu�dos no projeto.

Pastas images:
	Possuem imagens que s�o usadas no site.

Pasta fonts:
	Possui fontes de texto.

Descri��o dos testes realizados:

	Testes de login e contas:
		Foram realizados testes para avaliar a funcionalidade do login.
		Ent�o, � poss�vel logar como usu�rio comum (usuario1) e como adm (admin), como descrito acima, corretamente. Usu�rios ou senhas incorretos
		resultam em erro. Se novos usu�rios forem criados, tamb�m ser� poss�vel logar com eles e us�-los normalmente. � poss�vel editar as informa��es,
		e realizar os devidos cadastros a partir de cada usu�rio. O upload de imagens de pets e usu�rios funciona corretamente.

	Testes de cadastro:
		Foram realizados testes para avaliar a funcionalidade dos diversos cadastros presentes no site, como cadastro de pets, usu�rios, produtos e servi�os.
		Atrav�s destes testes constatamos que os cadastros est�o funcionando corretamente, pois ao realizar o cadastro, o item cadastrado passa a aparecer junto com os outros itens dentro do site. 


	Teste de agendamento:
		Um usu�rio pode agendar servi�os apenas nos slots que n�o foram ocupados por outros servi�os. Ao ser feito o agendamento, este aparece na
		lista de agendamentos do usu�rio e tamb�m na lista para os administradores, e o slot de hor�rio agendado passa a ficar indispon�vel
		para ser usado por outros usu�rios.
