#!/bin/sh

apk update
apk add darkhttpd

darkhttpd /website
