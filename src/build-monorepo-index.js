const shell = require('shelljs');
const fs = require('fs');
const path = require('path');

function generateHTML(packages) {
  const packageRows = packages.map(
    package => `
      <div class="package-row">
        <a href="${path.join(package.name, 'index.html')}">${package.name}</a>
        <span>${package.description}</span>
      </div>
    `
  );
  const index = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>Page Title</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" type="text/css" href="mono-repo-index.css">
    </head>
    <body>
      <img class="banner" src="storybook.svg" alt="Storybook"/>
      <div class="content">
        ${packageRows.join('')}
      </div>
    </body>
    </html>
  `;

  return index;
}

module.exports = function buildMonorepoIndex(packages, customHTMLGenerate, outputDir) {
  let index;

  console.log(`=> Building index.html for monorepo`);
  
  if (customHTMLGenerate) {
    const fn = require(path.join(process.cwd(), customHTMLGenerate))

    if (typeof fn === 'function') {
      index = fn(packages, outputDir)
    }
  } else {
    index = generateHTML(packages)

    shell.cp(
      path.join(__dirname, 'storybook.svg'),
      path.join(outputDir, 'storybook.svg')
    );
    shell.cp(
      path.join(__dirname, 'mono-repo-index.css'),
      path.join(outputDir, 'mono-repo-index.css')
    );
  }

  fs.writeFileSync(path.join(outputDir, 'index.html'), index);
};
