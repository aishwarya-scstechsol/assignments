import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';
export class EncryptionHelper{
    encrypt = async(information ,iv , password)=>{

        const  key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, iv);


const encryptedText = Buffer.concat([
  cipher.update(information),
  cipher.final(),
])
return encryptedText

    }}