JS=area_usuario.js area_adm.js index.js Server.js loja.js carrinho.js

all: $(JS)

%.js: %.ts
	tsc --sourcemap -t "es6" $<
