[![Build Status](https://travis-ci.org/vardars/dotize.svg?branch=master)](https://travis-ci.org/vardars/dotize)

dotize
=

Convert (Complex JSON object)

    {
      "status": "success",
      "auth": {
        "code": 123,
        "name": "qwerty asdfgh"
      }
    }

to (Dot notation JSON object)

    {
      "status": "success",
      "auth.code": 123,
      "auth.name": "qwerty asdfgh"
    }

npm
=
npm install dotize

tests
=

    npm install -g mocha
    mocha test/test.js
