build:
	coffee -c -l alive.coffee

publish: build
	rm -rf node_modules
	npm publish .

test: build
	vows test/*
