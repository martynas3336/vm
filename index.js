const commander = require('commander');
const command = new commander.Command();
const fs = require('fs');
const decrypt = require('./decrypt');
const commands = require('./test/commands.json');

command
.option('-i, --input <file>', 'Input file')
.option('-o, --output <file>', 'Output file')
.option('-d, --decryptor <file>', 'Decryptor file')
.parse(process.argv);


let reg = Array.apply(null, Array(16)).map(() => 10);
let res = [];


const decryptor = fs.readFileSync(command.decryptor);
const file = fs.readFileSync(command.input);


let fileReg = {
  file:file,
  position:0,
  flag:false,
  in:(file.length === 0 ? true : false),
  flength:file.length,
}

let decryptorReg = {
  position:0,
  action:decryptor[0],
  byte:decryptor[1],
  dlength:decryptor.length,
}

while(true) {
  if(decryptorReg.exit === true) break;
  if(decryptorReg.position > decryptorReg.dlength-1)
    decryptorReg.position = (decryptorReg.position - parseInt(decryptorReg.position / decryptorReg.dlength) * decryptorReg.dlength);

  decryptorReg.action = decryptor[decryptorReg.position];
  decryptorReg.byte = decryptor[decryptorReg.position+1];

  decrypt[commands[decryptorReg.action]]({decryptorReg, fileReg, reg, res});
}

let result = Buffer.from(res);

fs.writeFile(command.output, result, (err) => {
  if(err)
  {
    console.log(err);
  } else {
    console.log('success');
  }
})
