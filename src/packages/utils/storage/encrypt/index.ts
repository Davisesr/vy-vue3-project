import CryptoJs from "crypto-js"

const SECRET_KEY = CryptoJS.enc.Utf8.parse('3333e6e143439161'); //十六位十六进制数作为密钥
const SECRET_IV = CryptoJS.enc.Utf8.parse('e3bbe7e3ba84431a'); //十六位十六进制数作为密钥偏移量


/**
 * 加密
 * @param data
 */
function encrypt(data: object | string): string {

  // 检查
  if (typeof data === 'object'){
    try {
      data = JSON.stringify(data)
    }catch (e) {
      throw new Error('数据异常：' + e)
    }
  }

  // 加密
  const dataHex = CryptoJs.enc.Utf8.parse(data);
  const encrypted = CryptoJs.AES.encrypt(
    dataHex,
    SECRET_KEY,
    {
      iv: SECRET_IV,
      mode: CryptoJs.mode.CBC,
      padding: CryptoJs.pad.Pkcs7
    }
  )
  return encrypted.ciphertext.toString();
}

/**
 * 解密
 * @param data
 */
function decrypt(data:string){

  const encryptedHexStr = CryptoJS.enc.Hex.parse(data);
  const str = CryptoJs.enc.Base64.stringify(encryptedHexStr);

  const decrypted = CryptoJs.AES.decrypt(
    str,
    SECRET_KEY,
    {
      iv:SECRET_IV,
      mode:CryptoJs.mode.CBC,
      padding:CryptoJs.pad.Pkcs7
    }
  );

  return decrypted.toString(CryptoJs.enc.Utf8).toString()
}

export {
  encrypt,
  decrypt
}