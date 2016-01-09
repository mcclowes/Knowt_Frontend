S3_BUCKET=www.knowt.io

all: upload

.PHONY: upload
upload: dep/s3cmd/s3cmd
	dep/s3cmd/s3cmd sync --delete-removed --acl-public --exclude '.git/*' ./ s3://$(S3_BUCKET)/

dep/s3cmd/s3cmd: dep
	cd dep ; \
	git clone git@github.com:s3tools/s3cmd.git
	dep/s3cmd/s3cmd --configure

dep:
	mkdir dep 
