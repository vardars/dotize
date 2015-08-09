[![Build Status](https://travis-ci.org/vardars/dotize.svg?branch=master)](https://travis-ci.org/vardars/dotize)

dotize
======

Convert (Complex JSON object)

    {
      "status": "success",
      "auth": {
        "code": "23123213",
        "name": "qwerty asdfgh"
      }
    }

to (Dot notation JSON object)

    {
      "status": "success",
      "auth.code": "23123213",
      "auth.name": "qwerty asdfgh"
    }

tests
=====

    npm install -g mocha
    mocha test/test.js
