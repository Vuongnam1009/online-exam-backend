
module.exports = (app) => {
    require('fs')
      .readdirSync('src/routers')
      .forEach((fileName) => {
        if (fileName === 'index.js') return;
        if (['js'].indexOf(fileName.split('.').pop()) === -1) return;
        app.use(`/api/v1/${fileName.slice(0,fileName.length-3)}`, require(`./${fileName}`));
      });
  };