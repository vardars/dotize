[![npm version](https://badge.fury.io/js/dotize.svg)](https://badge.fury.io/js/dotize)
[![Bower version](https://badge.fury.io/bo/dotize.svg)](https://badge.fury.io/bo/dotize)
[![codecov](https://codecov.io/gh/vardars/dotize/branch/master/graph/badge.svg)](https://codecov.io/gh/vardars/dotize)

dotize
=

Convert (Complex js object)

    {
      "status": "success",
      "auth": {
        "code": 123,
        "name": "qwerty asdfgh"
      }
    }

to (Dot notation js object)

    {
      "status": "success",
      "auth.code": 123,
      "auth.name": "qwerty asdfgh"
    }

[npm](https://www.npmjs.com/package/dotize)
=
    npm install dotize

bower
=
    bower install dotize

tests
=

    npm install
    npm test
