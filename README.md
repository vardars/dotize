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

Using with Node.js ESM
=

`dotize` supports ES module imports, allowing you to use it seamlessly in your modern Node.js projects.

To use `dotize` as an ES module:

1.  Ensure your project's `package.json` includes `"type": "module"`, or name your JavaScript files with the `.mjs` extension (e.g., `your-file.mjs`). This tells Node.js to treat the files as ES modules.

2.  Import `dotize` into your module:

    ```javascript
    // your-file.mjs or your-file.js (if "type": "module" is in package.json)
    import dotize from 'dotize';

    const myObject = {
      greetings: {
        hello: "world",
        hi: "there"
      },
      level: 1
    };

    const dottedObject = dotize.convert(myObject);
    console.log(dottedObject);
    // Output: { 'greetings.hello': 'world', 'greetings.hi': 'there', level: 1 }

    const originalObject = dotize.backward(dottedObject);
    console.log(originalObject);
    // Output: { greetings: { hello: 'world', hi: 'there' }, level: 1 }
    ```

This setup allows you to leverage `dotize`'s functionality while adhering to modern JavaScript module practices.
