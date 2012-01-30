build:
	coffee -c -l alive.coffee

publish: build clean
	npm publish .

test: build
	vows test/*

clean:
	rm -rf node_modules
