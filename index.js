const fs = require('fs');

module.exports = class Rename {
  constructor(options) {
    console.log('========rename init=======')
    this.options = { ...options };
  }

  apply(compiler) {
    console.log('========rename apply=======')

    compiler.hooks.afterEmit.tap('Rename.emit', compilation => {
      const { assets } = compilation;
      const { originNameReg, targetName } = this.options;
      const reg = new RegExp(originNameReg);
      const originFiles = Object.keys(assets).filter(fileName => {
        // console.log(fileName);
        return reg.test(fileName);
      });
      console.log('===========', originFiles);
      originFiles.forEach(fileName => {
        const _oldName = assets[fileName].existsAt;
        const _newName = _oldName.replace(originNameReg, targetName);
        console.log(_oldName, _newName);
        fs.rename(_oldName, _newName, (res) => {
          console.log(res);
        });
      });
    });
  }
};
