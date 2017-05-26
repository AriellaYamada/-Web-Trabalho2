JS=area_usuario.js index.js Server.js

all: $(JS)

%.js: %.ts
	tsc --sourcemap -t "es6" $<
