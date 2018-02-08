# Storybook Deployer

This is a simple tool allows you to deploy your Storybook into a static hosting service. (Currently, GitHub Pages only.)

## Getting Started

Install Storybook Deployer with:

```
npm i @storybook/storybook-deployer --save-dev
```
Then add a NPM script like this:

```json
{
  "scripts": {
    "deploy-storybook": "storybook-to-ghpages",
  }
}
```

Then you can run `npm run deploy-storybook` to deploy the Storybook to GitHub Pages.

### Custom Build Configuration

If you customize the build configuration with some additional params (like static file directory), then you need to expose another NPM script like this:

```json
{
  "scripts": {
    "build-storybook": "build-storybook -s public -o .out",
  }
}
```

> Make sure to set the output directory as **`.out`**.

### Skip Build Step

If you have previously built your storybook output (through a different CI step, etc) and just need to publish it, specify the directory like this:

```sh
npm run deploy-storybook -- --existing-output-dir=.out
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
