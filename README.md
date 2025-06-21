[![npm version](https://badge.fury.io/js/dotize.svg)](https://badge.fury.io/js/dotize)
[![GitHub version](https://badge.fury.io/gh/vardars%2Fdotize.svg?icon=si%3Agithub)](https://badge.fury.io/gh/vardars%2Fdotize)

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

tests
=

    # checkout project and
    npm install && npm test

use in browser
=

[https://vardars.github.io/dotize/](https://vardars.github.io/dotize/)
