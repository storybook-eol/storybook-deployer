# Storybook Deployer

This is a simple tool allows you to deploy your Storybook into a static hosting service. (Currently, GitHub Pages and AWS S3 beta)

```sh
$ storybook-to-ghpages --help

Options:
  --help, -h                      Show help.                                             [boolean]
  --version                       Show version number                                    [boolean]
  --existing-output-dir, -e       If you have previously built your storybook output (through a
                                  different CI step, etc) and just need to publish it     [string]
  --out, -o                       Configure the output directory                          [string]
  --packages, -p                  Directory for package.jsons (monorepo support)          [string]
  --monorepo-index-generator, -m  Path to file to customize the monorepo index.html. This function
                                  should return the html for the page.                    [string]
  --script, -s                    Specify the build script in your package.json           [string]
  --ci                            Deploy the storybook in CI mode (github only)          [boolean]
  --dry-run                       Run build but hold off on publishing                   [boolean]
  --remote                        Git remote to push to               [string] [default: "origin"]
  --branch                        Git branch to push to             [string] [default: "gh-pages"]
  --source-branch                 Source branch to push from          [string] [default: "master"]
  --host-token-env-variable, -t   Github token for CI publish       [string] [default: "GH_TOKEN"]
  --aws-profile                   AWS profile to use for publishing  [string] [default: "default"]
  --bucket-path                   AWS bucket path to use for publishing                   [string]
```

## Getting Started

Install Storybook Deployer with:

```
npm i @storybook/storybook-deployer --save-dev
```

Then add a NPM script like this for github page:

```json
{
  "scripts": {
    "deploy-storybook": "storybook-to-ghpages"
  }
}
```

or like this for AWS S3:

```json
{
  "scripts": {
    "deploy-storybook": "storybook-to-aws-s3"
  }
}
```

Then you can run `npm run deploy-storybook` to deploy the Storybook.

### Custom Build Configuration

If you customize the build configuration with some additional params (like static file directory), then you need to expose another NPM script like this:

```json
{
  "scripts": {
    "build-storybook": "build-storybook -s public"
  }
}
```

### Configure Build Directory

If you need to configure the output directory you can supply the `out` flag.

```sh
npm run deploy-storybook -- --out=.out
```

### Skip Build Step

If you have previously built your storybook output (through a different CI step, etc) and just need to publish it, specify the directory like this:

```sh
npm run deploy-storybook -- --existing-output-dir=.out
```

### Skip Deploy Step

if you want to see how everything build without pushing to a remote, use the `--dry-run` flag.

```sh
npm run deploy-storybook -- --dry-run
```

### Deploy a Monorepo

If you manage a monorepo with multiple storybooks you can you pass the `packages` flag to `deploy-storybook` to scan a directory for `package.json`s.

The following command will search the `packages` directory for packages. It will also generate a default `index.html` that links to all of the loaded storybooks.

```sh
npm run deploy-storybook -- --packages packages
```

### Customize Monorepo `index.html`

To customize the monorepo `index.html` you can pass the `monorepo-index-generator` flag to `deploy-storybook`. This file should export a function that receive the following arguments and returns the html for the page.

- an array of all the `package.json` data from the loaded storybooks as the first argument
- the output directory

```sh
npm run deploy-storybook -- --monorepo-index-generator my-custom-generator.js
```

### Deploying Storybook as part of a CI service

To deploy Storybook as part of a CI step, pass the `ci` flag to `npm run deploy-storybook`.

Because pushing to GitHub as part of a CI step requires a [personal access token](https://github.com/blog/1509-personal-api-tokens), Storybook uses the `GH_TOKEN` environment variable, by default, to authenticate GitHub pushes.

This environment variable name can be configured via the `host-token-env-variable` flag.

For example, if your access token is stored in the `GH_TOKEN` environment variable

```sh
npm run deploy-storybook -- --ci
```

Or if your access token is stored in the `GITHUB_TOKEN` environment variable

```sh
npm run deploy-storybook -- --ci --host-token-env-variable=GITHUB_TOKEN
```

### Custom deploy configuration

If you want to customize Git username, email or commit message, add this to `package.json`:

```json
"storybook-deployer": {
  "gitUsername": "Custom Username",
  "gitEmail": "custom@email.com",
  "commitMessage": "Deploy Storybook [skip ci]"
}
```

It will override the default configuration:

```json
"storybook-deployer": {
  "gitUsername": "GH Pages Bot",
  "gitEmail": "hello@ghbot.com",
  "commitMessage": "Deploy Storybook to GitHub Pages"
}
```

To deploy Storybook to a remote other than `origin`, pass a `--remote` flag to `npm run deploy-storybook`.
For example, to deploy to your `upstream` remote:

```sh
npm run deploy-storybook -- --remote=upstream
```

Or, to specify a target branch and serve your storybook with rawgit instead of gh-pages:

```sh
npm run deploy-storybook -- --branch=feature-branch
```

Or, to specify a source branch other than `master`, pass a `--source-branch` flag to `npm run deploy-storybook`:

```sh
npm run deploy-storybook -- --source-branch=release
```

#### Custom deploy configuration for S3

For AWS S3 deployment you must have [awscli](https://docs.aws.amazon.com/cli/latest/userguide/installing.html) installed.

You must specify a bucket path with `bucket-path` option: `my-bucket-name/path/to/destination-folder-in-bucket` and have the rights to write to this bucket.

You can change the aws profile used to run the command with the `aws-profile` option.

example: `storybook-to-aws-s3 --bucket-path=my-bucket-name/path/to/destination-folder-in-bucket --aws-profile=myprofile`
