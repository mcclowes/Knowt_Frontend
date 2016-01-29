SHELL=/bin/bash
S3_BUCKET= www.knowt.io

JS = $(shell find js -name "*.js" )
HTML = $(shell find js -name "*.html" )
HTML_DEPLOY = $(HTML:html/%=deploy/%)

deploy/%: html/%
	cp $< $@

	

watchHTML:
	while true; do \
		make HTML; \
		inotifywait -qre close_write .; \
	done
