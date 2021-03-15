import validator from 'validator';
import chalk from 'chalk';

const iniEmail = validator.isEmail(`rizalfauzi774@gmail.com`);
const iniNoHp = validator.isMobilePhone(`085156568650`, `id-ID`);

const pesan = chalk`Lorem {red.italic.strikethrough ipsum dolor}, sit amet consectetur adipisicing elit. Voluptate, {bgBlue.black recusandae!}`;
console.log(pesan);
console.log(iniNoHp);