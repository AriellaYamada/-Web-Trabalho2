JS=area_usuario.js area_adm.js index.js Server.js

all: $(JS)

%.js: %.ts
	tsc --sourcemap -t "es6" $<
