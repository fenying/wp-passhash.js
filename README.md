# WordPress Password Hasher

A password hash verify tool for WordPress (4.7+) in Node.js.

> Currently only provides the methods to check the result of 

## Requirement

- TypeScript v2.6.1 (or newer)
- Node.js v8.0.0 (or newer)

## Installation

```sh
npm i wp-passhash --save
```

## Usage

```ts
import createPasswordHasher from "wp-passhash";

let passHasher = createPasswordHasher();

const plainPassword: string = "Nob9x(nmj7sm9MW$bwaOsmey";
const hash: string = "$P$BJCTKwCt8aPjO/mE5bWv6q6u9D7abH/";

/**
 * Use method hash to calculate the hash result of a password.
 */
console.log(passHasher.hash(
    plainPassword,
    hash
)); // should be equal to hash

/**
 * Or just use the method check to verify whether the password matches the
 * hash.
 */
console.log(passHasher.check(
    "8#f9W#gApQC)KBF$NZW)I!(K",
    "$P$BPtHLwtFQBDkF1tK9CXfbt09wsY5eV/"
));

console.log(passHasher.check(
    "gJwnOv#YlIV^urVXtZwRbOk1",
    "$P$B3r.hG2lVzacV.VeI05sjN0sO6hZva."
));
```

## License

This library is published under [Apache-2.0](./LICENSE) license.
