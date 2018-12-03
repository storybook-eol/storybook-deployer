const defaultConfig = {
  gitUsername: "GH Pages Bot",
  gitEmail: "hello@ghbot.com",
  commitMessage: "Deploy Storybook to GitHub Pages"
};

module.exports = (packageJson, argv) => ({
  config: Object.assign(
    {},
    defaultConfig,
    packageJson["storybook-deployer"] || defaultConfig
  ),
  SKIP_BUILD: Boolean(argv["existing-output-dir"]),
  OUTPUT_DIR:
    argv.out ||
    argv["existing-output-dir"] ||
    "out" + Math.ceil(Math.random() * 9999),
  PACKAGES_DIRECTORY: argv["packages"],
  MONOREPO_INDEX_GENERATOR: argv["monorepo-index-generator"],
  NPM_SCRIPT: argv["script"] || "build-storybook",
  CI_DEPLOY: Boolean(argv["ci"]),
  // Git Variables
  GIT_REMOTE: argv["remote"] || "origin",
  TARGET_BRANCH: argv["branch"] || "gh-pages",
  SOURCE_BRANCH: argv["source-branch"] || "master",
  HOST_TOKEN_ENV_VARIABLE: argv["host-token-env-variable"] || "GH_TOKEN",
  HOST_TOKEN: process.env[HOST_TOKEN_ENV_VARIABLE],
  // AWS Variables
  AWS_PROFILE: argv["aws-profile"] || "default",
  BUCKET_PATH: argv["bucket-path"],
  S3_PATH: "s3://" + argv["bucket-path"]
});
