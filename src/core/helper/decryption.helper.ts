import { createDecipheriv, randomBytes, scrypt } from "crypto";
import { promisify } from "util";

export class DecryptionHelper{
    decrypt= async(encryptedText ,iv ,password ) =>{
        const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
        const decipher = createDecipheriv('aes-256-ctr', key, iv);

        
const decryptedText = Buffer.concat([
  decipher.update(encryptedText),
  decipher.final(),
]);

            
            
            
return decryptedText


    }
}