const Cipher = () => {
  return null;
}

// Encryption function using Vigenère cipher
function encrpyt(plainText, key) {
    let encryptedText = '';
    let keyIndex = 0;
    const ACode = 'A'.charCodeAt(0);
    const ZCode = 'Z'.charCodeAt(0);
    const aCode = 'a'.charCodeAt(0);
    const zCode = 'z'.charCodeAt(0);

    for (let i = 0; i < plainText.length; i++) {
        const plainChar = plainText.charAt(i);
        let encryptedChar = plainChar;
        
        if (/[A-Za-z]/.test(plainChar)) {
            const shift = key.charAt(keyIndex % key.length).toUpperCase().charCodeAt(0) - ACode;
            let charCode = plainChar.charCodeAt(0);
            if (charCode >= ACode && charCode <= ZCode) {
                encryptedChar = String.fromCharCode(((charCode - ACode + shift) % 26) + ACode);
            } else if (charCode >= aCode && charCode <= zCode) {
                encryptedChar = String.fromCharCode(((charCode - aCode + shift) % 26) + aCode);
            }
            keyIndex++;
        }
        encryptedText += encryptedChar;
    }

    return encryptedText;
}

// Decryption function using Vigenère cipher
function decrypt(encryptedText, key) {
    let decryptedText = '';
    let keyIndex = 0;
    const ACode = 'A'.charCodeAt(0);
    const ZCode = 'Z'.charCodeAt(0);
    const aCode = 'a'.charCodeAt(0);
    const zCode = 'z'.charCodeAt(0);

    for (let i = 0; i < encryptedText.length; i++) {
        const encryptedChar = encryptedText.charAt(i);
        let decryptedChar = encryptedChar;

        if (/[A-Za-z]/.test(encryptedChar)) {
            const shift = key.charAt(keyIndex % key.length).toUpperCase().charCodeAt(0) - ACode;
            let charCode = encryptedChar.charCodeAt(0);
            if (charCode >= ACode && charCode <= ZCode) {
                decryptedChar = String.fromCharCode(((charCode - ACode - shift + 26) % 26) + ACode);
            } else if (charCode >= aCode && charCode <= zCode) {
                decryptedChar = String.fromCharCode(((charCode - aCode - shift + 26) % 26) + aCode);
            }
            keyIndex++;
        }
        decryptedText += decryptedChar;
    }

    return decryptedText;
}

export {Cipher, encrpyt, decrypt};
