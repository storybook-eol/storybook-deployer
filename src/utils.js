const shell = require('shelljs');
const parseGitUrl = require('git-url-parse');

module.exports.exec = function exec(command) {
  console.log(`   executing: ${command}`);

  const options = { silent: true };
  const ref = shell.exec(command, options);

  if (ref.code === 0) {
    return ref.stdout.trim();
  }
  
  // If the failed shell exec has meaningful error output, do not bury it:
  if (ref.stderr.trim()) {
    console.error(ref.stderr);
  }

  throw new Error(
    `Exec code(${ref.code}) on executing: ${command}\n${shell.stderr}`
  );
};

module.exports.getGHPagesUrl = function getGHPagesUrl(ghUrl) {
  const parsedUrl = parseGitUrl(ghUrl);

  return parsedUrl.resource === 'github.com'
    ? `https://${parsedUrl.owner}.github.io/${parsedUrl.name}/`
    : `https://${parsedUrl.resource}/pages/${parsedUrl.full_name}/`;
};
