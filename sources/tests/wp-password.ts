/*
   +----------------------------------------------------------------------+
   | WordPress Password Hasher Library                                    |
   +----------------------------------------------------------------------+
   | Copyright (c) 2007-2017 Fenying Studio                               |
   +----------------------------------------------------------------------+
   | This source file is subject to version 2.0 of the Apache license,    |
   | that is bundled with this package in the file LICENSE, and is        |
   | available through the world-wide-web at the following url:           |
   | https://github.com/fenying/wp-passhash.js/blob/master/LICENSE        |
   +----------------------------------------------------------------------+
   | Authors: Angus Fenying <i.am.x.fenying@gmail.com>                    |
   +----------------------------------------------------------------------+
 */

// tslint:disable:no-console

import createPasswordHasher from "..";

let passHasher = createPasswordHasher();

const plainPassword: string = "Nob9x(nmj7sm9MW$bwaOsmey";
const hash: string = "$P$BJCTKwCt8aPjO/mE5bWv6q6u9D7abH/";

console.log(passHasher.hash(
    plainPassword,
    hash
)); // should be equal to hash

console.log(passHasher.check(
    "8#f9W#gApQC)KBF$NZW)I!(K",
    "$P$BPtHLwtFQBDkF1tK9CXfbt09wsY5eV/"
));

console.log(passHasher.check(
    "gJwnOv#YlIV^urVXtZwRbOk1",
    "$P$B3r.hG2lVzacV.VeI05sjN0sO6hZva."
));
