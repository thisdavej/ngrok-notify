/* eslint no-console: 0 */
const fs = require('fs');
const path = require('path');

module.exports = (force = false) => {
  const globalFolder = path.resolve(
    process.execPath,
    '../../lib/node_modules/ngrok-notify'
  );
  const cwd = process.cwd();

  function copyFile(source, dest, force = false) {
    const sourcePath = path.join(globalFolder, source);
    const destPath = path.join(cwd, dest);
    if (!fs.existsSync(destPath) || force) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`Added file: ${dest}`)
    } else {
      console.log(
        `${dest} not added since it already exists in this directory`
      );
    }
  }

  copyFile('.env.example', '.env', force);
  copyFile('config.yml', 'config.yml', force);
  console.log('\nPlease update config.yml and .env with your info so you can send an email through GMail.')
};

module.exports.checkIfNeeded = () => {
  const files = ['config.yml', '.env']
  const cwd = process.cwd();

  let result;
  const missingFiles = files.filter(f => !fs.existsSync(path.join(cwd, f)) );
  
  if (missingFiles.length > 0) {
    const list = missingFiles.join(' ');
    result = `The following files are missing: ${list}`;
  }
  return result;
};
