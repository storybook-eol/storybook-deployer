var publishUtils = require('./utils');
var shell = require('shelljs');

module.exports = function (skipBuild, outputDirectory, packageJson, npmScriptName) {
  if (skipBuild) {
    return;
  }

  // clear and re-create the out directory
  shell.rm('-rf', outputDirectory);
  shell.mkdir(outputDirectory);

  npmScriptName = npmScriptName || 'build-storybook';
  // run our compile script
  console.log('=> Building storybook');
  if (packageJson.scripts[npmScriptName]) {
    publishUtils.exec('npm run ' + npmScriptName + ' -- -o ' + outputDirectory);
  } else {
    publishUtils.exec('node ./node_modules/.bin/build-storybook -o ' + outputDirectory);
  }
};
