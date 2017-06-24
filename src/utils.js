var shell = require('shelljs');
var parseGitUrl = require('git-url-parse');

module.exports.exec = function exec(command) {
  console.log("   executing: " + command);
  var options = { silent: true };
  var ref = shell.exec(command, options);
  if (ref.code === 0) {
   return ref.stdout.trim();
  }

  var message =
    'Exec code(' + ref.code + ') on executing: ' + command + '\n' +
    shell.stderr;

  throw new Error(message);
};

module.exports.getGHPagesUrl = function getGHPagesUrl(ghUrl) {
  var parsedUrl = parseGitUrl(ghUrl);
  var ghPagesUrl;
  if (parsedUrl.resource === 'github.com') {
    ghPagesUrl = 'https://' + parsedUrl.owner + '.github.io/' + parsedUrl.name + '/';
  } else { // Github Enterprise
    ghPagesUrl = 'https://' + parsedUrl.resource + '/pages/' + parsedUrl.full_name + '/';
  }
  
  return ghPagesUrl;
};
