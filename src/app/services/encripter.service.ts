import { Injectable } from '@angular/core';
import { JSEncrypt } from "jsencrypt";

@Injectable()
export class EncripterService {

    public pemPublic: string = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN
FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76
xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4
gwQco1KRMDSmXSMkDwIDAQAB`;

    constructor() {

    }

    public encripterInformation(encryptedObject) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let encryptor = new JSEncrypt();
                encryptor.setPublicKey(this.pemPublic);
                let encrypted = encryptor.encrypt(encryptedObject);
                resolve(encrypted);
            }, 1000);
        });
    }

}
