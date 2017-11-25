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

import * as crypto from "crypto";

const ITOA64_TABLE: string = "./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export interface IPasswordHash {

    hash(password: string, storedHash: string): string;

    check(password: string, storedHash: string): boolean;
}

class PasswordHash implements IPasswordHash {

    public hash(password: string, setting: string): string {

        let count_log2 = ITOA64_TABLE.indexOf(setting[3]);

        if (count_log2 < 7 || count_log2 > 30) {

            return "*";
        }

        let count = 1 << count_log2;

        let salt = setting.substr(4, 8);

        let hasher = crypto.createHash("md5");

        hasher.update(`${salt}${password}`);

        let hash = hasher.digest();

        do {
            hasher = crypto.createHash("md5");
            hasher.update(hash);
            hasher.update(password);
            hash = hasher.digest();
        }
        while (--count);

        return `${setting.substr(0, 12)}${this._encode64(hash, 16)}`;
    }

    protected _encode64(input: Buffer, count: number): string {

        let output = "";

        let i = 0;

        do {

            let value = input[i++];

            output += ITOA64_TABLE[value & 0x3f];

            if (i < count) {

                value |= input[i] << 8;
            }

            output += ITOA64_TABLE[(value >> 6) & 0x3f];

            if (i++ >= count) {

                break;
            }

            if (i < count) {

                value |= input[i] << 16;
            }

            output += ITOA64_TABLE[(value >> 12) & 0x3f];

            if (i++ >= count) {

                break;
            }

            output += ITOA64_TABLE[(value >> 18) & 0x3f];

        } while (i < count);

        return output;
    }

    public check(password: string, storedHash: string): boolean {

        if (password.length > 4096) {

            return false;
        }

        let hash = this.hash(password, storedHash);

        if (hash === "*") {
            return false;
        }

        return hash === storedHash;
    }
}

export function createPasswordHasher(): IPasswordHash {

    return new PasswordHash();
}

export default createPasswordHasher;
