# Storybook Deployer

This is a simple tool allows you to deploy your Storybook into a static hosting service.
(Currently, GitHub Pages only.)

## Getting Started

Install Storybook Deployer with:

```
npm i --save @storybook/storybook-deployer
```
Then add a NPM script like this:

```js
{
  "scripts": {
    ...
    "deploy-storybook": "storybook-to-ghpages",
    ...
  }
}
```

Then you can run `npm run deploy-storybook` to deploy the Storybook to GitHub Pages.

### Custom Build Configuration

If you customize the build configuration with some additional params (like static file directory), then you need to expose another NPM script like this:

```js
{
  "scripts": {
    ...
    "build-storybook": "build-storybook -s public -o .out",
    ...
  }
}
```

> Make sure to set the output directory as **`.out`**.

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

```js
"storybook-deployer": {
  "gitUsername": "GH Pages Bot",
  "gitEmail": "hello@ghbot.com",
  "commitMessage": "Deploy Storybook to GitHub Pages"
}
```

To deploy Storybook to a remote other than `origin`, pass a `--remote` flag to `npm run deploy-storybook`.  
For example, to deploy to your `upstream` remote:

```
npm run deploy-storybook -- --remote=upstream
```
 
 Or, to specify a target branch and serve your storybook with rawgit instead of gh-pages:
 ```
 npm run deploy-storybook -- --branch=feature-branch
 ```