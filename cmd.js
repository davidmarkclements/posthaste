#!/usr/bin/env node

var fs = require('fs')
var posthaste = require('./')
var file = process.argv.slice(2)[0]
var src  = fs.readFileSync(file) + ''

process.stdout.write(posthaste(src) + '')