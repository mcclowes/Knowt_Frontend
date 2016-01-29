#!/bin/bash

S3_BUCKET="www.knowt.io"

if [ "$1" = "-c" ];
then
    rm -rf s3cmd
    git clone git@github.com:s3tools/s3cmd.git --depth 1
    s3cmd/s3cmd --configure
fi

cd deploy
../s3cmd/s3cmd sync --delete-removed --acl-public . s3://$S3_BUCKET/
