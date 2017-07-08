Alunos:
Ariella Yamada Brambila				8937034
Arnaldo Lopes Stanzani				8937510
Guilherme Silva dos Anjos			8936839
Rodrigo de Andrade Santos Weigert	8937503

A página inicial da aplicação é index.html, e possui informações básicas da pet shop, além de links para as principais funções, como a loja e agendamento de serviços. Além disso, há a área destinada a login. Inicialmente existem dois usuários exemplo. O primeiro, um usuário comum, possui como login "usuario1" e senha "1234". O segundo, é administrador, e possui "admin" como login e "admin" como senha. Novos usuários podem ser criados pelo admin.

Ao entrar como usuário comum, existe uma dashboard em que é possível visualizar e agendar serviços, visualizar e cadastrar pets, além de visualizar e alterar as informações de seu perfil.

Ao entrar como administrador, também existe uma dashboard, com informações sobre os próximos serviços agendados na petshop, permitindo a busca e cadastro de novos serviços, busca e cadastro de usuários, além das informações do administrador.

Descrição dos arquivos submetidos:

Arquivos html:
	index.html: Página inicial do pet shop, permite acesso às funcionalidades do sistema.
	area_usuario.html: Página inicial para usuários, assim que os usuários se logam no sistema eles são direcionados a esta página.
	area_adm.html: Página inicial do administrador do sistema, ao se logar o administrador vê essa página.

server.js: contém toda a lógica do servidor em nodejs com express. O servidor escuta nas portas 8080 (http) e 8081 (https)

package.json: para uso dos comandos npm install (instalar dependências do nodejs do servidor) e npm start (rodar servidor)

Pasta ssl: contém dados da chave usada para o servidor https.

Pasta public: contém arquivos servidos estaticamente pelo servidor (express).

Pasta public/ts:
	Arquivos typescript com lógicas específicas para cada tela html (index.ts, area_usuario.ts, area_adm.ts).
	Arquivos javascript e sourcemap gerados pela compilação do typescript.
	Arquivo Makefile para compilação dos arquivos typescript.

Pasta public/css:
	Contém arquivos de estilo para as páginas html.

Pasta public/js:
	Contém arquivos js incluídos no projeto.

Pastas images:
	Possuem imagens que são usadas no site.

Pasta fonts:
	Possui fontes de texto.

Descrição dos testes realizados:

	Testes de login e contas:
		Foram realizados testes para avaliar a funcionalidade do login.
		Então, é possível logar como usuário comum (usuario1) e como adm (admin), como descrito acima, corretamente. Usuários ou senhas incorretos
		resultam em erro. Se novos usuários forem criados, também será possível logar com eles e usá-los normalmente. É possível editar as informações,
		e realizar os devidos cadastros a partir de cada usuário. O upload de imagens de pets e usuários funciona corretamente.

	Testes de cadastro:
		Foram realizados testes para avaliar a funcionalidade dos diversos cadastros presentes no site, como cadastro de pets, usuários, produtos e serviços.
		Através destes testes constatamos que os cadastros estão funcionando corretamente, pois ao realizar o cadastro, o item cadastrado passa a aparecer junto com os outros itens dentro do site. 


	Teste de agendamento:
		Um usuário pode agendar serviços apenas nos slots que não foram ocupados por outros serviços. Ao ser feito o agendamento, este aparece na
		lista de agendamentos do usuário e também na lista para os administradores, e o slot de horário agendado passa a ficar indisponível
		para ser usado por outros usuários.
