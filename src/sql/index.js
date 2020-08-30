const fs = require('fs');
const path = require('path');

const sqlRequestList = {};
fs.readdirSync(__dirname, { withFileTypes: true })
  .filter(file => file.isDirectory() && /[^\.]+\.sql$/
    .test(file.name))
  .map(file => file.name.replace('.sql', ''))
  .forEach(dirName => {
    sqlRequestList[dirName] = {};
    fs.readdirSync(`${__dirname}/${dirName}.sql`)
      .filter(file => /[^\.]+\.sql$/.test(file))
      .forEach(sqlFile => {
        sqlRequestList[dirName][sqlFile
          .replace('.sql', '')] = fs.readFileSync(path.join(
          `${__dirname}/${dirName}.sql/`, sqlFile,
        )).toString();
      });
  });

module.exports = sqlRequestList;