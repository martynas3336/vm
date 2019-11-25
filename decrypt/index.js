const getNibbles = (byte) => {
  let nibble1 = byte & 0xF;
  let nibble2 = byte >> 4;
  return [nibble1, nibble2];
}

module.exports = {
  "INC": ({decryptorReg, fileReg, reg, res}) => {
    // console.log('INC');
    let nibbles = getNibbles(decryptorReg.byte);
    reg[nibbles[0]]++;

    if(reg[nibbles[0]] === 0) fileReg.flag = true;
    else fileReg.flag = false;

    decryptorReg.position+=2;
  },
  "DEC": ({decryptorReg, fileReg, reg, res}) => {
    // console.log('DEC');
    let nibbles = getNibbles(decryptorReg.byte);
    reg[nibbles[0]]--;

    if(reg[nibbles[0]] === 0) fileReg.flag = true;
    else fileReg.flag = false;

    decryptorReg.position+=2;
  },
  "MOV": ({decryptorReg, fileReg, reg, res}) => {
    // console.log('MOV');
    let nibbles = getNibbles(decryptorReg.byte);
    reg[nibbles[0]] = reg[nibbles[1]];

    if(reg[nibbles[0]] === 0) fileReg.flag = true;
    else fileReg.flag = false;

    decryptorReg.position+=2;
  },
  "MOVC": ({decryptorReg, fileReg, reg, res}) => {
    // console.log('MOVC');
    reg[0] = decryptorReg.byte;

    if(reg[0] === 0) fileReg.flag = true;
    else fileReg.flag = false;

    decryptorReg.position+=2;
  },
  "LSL": ({decryptorReg, fileReg, reg, res}) => {
    // console.log('LSL');
    let nibbles = getNibbles(decryptorReg.byte);
    reg[nibbles[0]] = reg[nibbles[0]] << 1;

    if(reg[nibbles[0]] === 0) fileReg.flag = true;
    else fileReg.flag = false;

    decryptorReg.position+=2;
  },
  "LSR": ({decryptorReg, fileReg, reg, res}) => {
    // console.log('LSR');
    let nibbles = getNibbles(decryptorReg.byte);
    reg[nibbles[0]] = reg[nibbles[0]] >> 1;

    if(reg[nibbles[0]] === 0) fileReg.flag = true;
    else fileReg.flag = false;

    decryptorReg.position+=2;
  },
  "JMP": ({decryptorReg, fileReg, reg, res}) => {
    // console.log('JMP');
    decryptorReg.position+=decryptorReg.byte;
  },
  "JZ": ({decryptorReg, fileReg, reg, res}) => {
    // console.log('JZ');
    if(fileReg.flag === true)
    {
      decryptorReg.position+=decryptorReg.byte;
    } else {
      decryptorReg.position+=2;
    }
  },
  "JNZ": ({decryptorReg, fileReg, reg, res}) => {
    // console.log('JNZ');
    if(fileReg.flag === false)
    {
      decryptorReg.position+=decryptorReg.byte;
    } else {
      decryptorReg.position+=2;
    }
  },
  "JFE": ({decryptorReg, fileReg, reg, res}) => {
    // console.log('JFE');
    if(fileReg.in === true)
    {
      decryptorReg.position+=decryptorReg.byte;
    } else {
      decryptorReg.position+=2;
    }
  },
  "RET": ({decryptorReg, fileReg, reg, res}) => {
    // console.log('RET');
    decryptorReg.exit = true;
  },
  "ADD": ({decryptorReg, fileReg, reg, res}) => {
    // console.log('ADD');
    let nibbles = getNibbles(decryptorReg.byte);
    reg[nibbles[0]]+=reg[nibbles[1]];

    if(reg[nibbles[0]] === 0) fileReg.flag = true;
    else fileReg.flag = false;

    decryptorReg.position+=2;
  },
  "SUB": ({decryptorReg, fileReg, reg, res}) => {
    // console.log('SUB');
    let nibbles = getNibbles(decryptorReg.byte);
    reg[nibbles[0]]-=reg[nibbles[1]];

    if(reg[nibbles[0]] === 0) fileReg.flag = true;
    else fileReg.flag = false;

    decryptorReg.position+=2;
  },
  "XOR": ({decryptorReg, fileReg, reg, res}) => {
    // console.log('XOR');
    let nibbles = getNibbles(decryptorReg.byte);

    reg[nibbles[0]] = reg[nibbles[0]] ^ reg[nibbles[1]];
    if(reg[nibbles[0]] === 0) fileReg.flag = true;
    else fileReg.flag = false;

    decryptorReg.position+=2;
  },
  "OR": ({decryptorReg, fileReg, reg, res}) => {
    // console.log('OR');
    let nibbles = getNibbles(decryptorReg.byte);
    reg[nibbles[0]] = reg[nibbles[0]] | reg[nibbles[1]];

    if(reg[nibbles[0]] === 0) fileReg.flag = true;
    else fileReg.flag = false;

    decryptorReg.position+=2;
  },
  "IN": ({decryptorReg, fileReg, reg, res}) => {
    // console.log('IN');
    let nibbles = getNibbles(decryptorReg.byte);
    reg[nibbles[0]] = fileReg.file[fileReg.position];
    fileReg.position++;
    if(fileReg.position === fileReg.flength)
    {
      fileReg.in = true;
    }
    decryptorReg.position+=2;
  },
  "OUT": ({decryptorReg, fileReg, reg, res}) => {
    // console.log('OUT');
    let nibbles = getNibbles(decryptorReg.byte);
    res.push(reg[nibbles[0]]);
    decryptorReg.position+=2;
  }
}
