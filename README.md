# github-action-base-ts - A Typescript GitHub Action Starter Repo 🚀▶️

[![Tests](https://img.shields.io/badge/tests-passing-gree.svg?logo=typescript&colorA=24292e&logoColor=white)](https://github.com/wesleyscholl/discussion-auto-responder/blob/main/src/__tests__/index.test.ts)  ![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/wesleyscholl/discussion-auto-responder/.github%2Fworkflows%2Fnode.js.yml?colorA=24292e&logo=github) ![GitHub Release Date - Published_At](https://img.shields.io/github/release-date/wesleyscholl/discussion-auto-responder?colorA=24292e&logo=github) [![coverage badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/wesleyscholl/fce8ce592425f8cc73ea124451808ce3/raw/450280b16d4e7a800f402f2233b224a2a37c7086/github-action-base-ts__heads_main.json?&colorA=24292e&label=test%20coverage)](https://gist.github.com/wesleyscholl/10f0b77400703c4a65f38434106adf2d)  [![GitHub Marketplace](https://img.shields.io/badge/marketplace-Discussion%20Auto%20Responder-blue.svg?colorA=24292e&colorB=7F00FF&style=flat&longCache=true&logo=githubactions&logoColor=white)](https://github.com/marketplace/actions/discussion-auto-responder) ![GitHub package.json dynamic](https://img.shields.io/github/package-json/name/wesleyscholl/discussion-auto-responder?colorA=24292e&colorB=7F00FF&logo=github) ![Dynamic YAML Badge](https://img.shields.io/badge/dynamic/yaml?url=https%3A%2F%2Fraw.githubusercontent.com%2Fwesleyscholl%2Fdiscussion-auto-responder%2Fmain%2F.github%2Fworkflows%2Frespond.yml&query=%24.jobs.autorespond.name&colorA=24292e&colorB=7F00FF&logo=yaml&label=description) [![Code Style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?logo=prettier&colorA=24292e&logoColor=white&colorB=7F00FF)](https://github.com/prettier/prettier) [![Code Linter: ESLint](https://img.shields.io/badge/code_linter-eslint-ff69b4.svg?logo=eslint&colorA=24292e&logoColor=white&colorB=7F00FF)](https://github.com/prettier/prettier) ![GitHub top language](https://img.shields.io/github/languages/top/wesleyscholl/discussion-auto-responder?colorA=24292e&colorB=7F00FF&logo=typescript&logoColor=white) ![GitHub contributors](https://img.shields.io/github/contributors/wesleyscholl/discussion-auto-responder?colorA=24292e&colorB=7F00FF&logo=github&logoColor=white)  ![GitHub Discussions](https://img.shields.io/github/discussions/wesleyscholl/discussion-auto-responder?colorA=24292e&colorB=7F00FF&logo=github&logoColor=white) ![GitHub Release (with filter)](https://img.shields.io/github/v/release/wesleyscholl/discussion-auto-responder?colorA=24292e&colorB=7F00FF&logo=github)  ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/wesleyscholl/discussion-auto-responder?colorA=24292e&colorB=7F00FF&logo=github) ![GitHub repo size](https://img.shields.io/github/repo-size/wesleyscholl/discussion-auto-responder?colorA=24292e&colorB=7F00FF&logo=github) ![GitHub package.json dynamic](https://img.shields.io/github/package-json/author/wesleyscholl/discussion-auto-responder?colorA=24292e&colorB=7F00FF&logo=github) [![MIT](https://img.shields.io/badge/license-MIT-blue?colorA=24292e&colorB=7F00FF&logo=github)](https://raw.githubusercontent.com/wesleyscholl/discussion-auto-responder/main/LICENSE)




## About

GitHub Action Description.


## Usage

In your workflow, to use this github action add a step like this to your workflow:


```yaml
- name: Run github-action
  uses: wesleyscholl/github-action@v1.0.0
  id: github-action
  with:
   GITHUB_TOKEN: "${{ secrets.GITHUB_TOKEN }}" # Required/optional - Description
   input1: "string" # Required/optional - Description
   input2: 10 # Required/optional - Description        
       
```

**Subscribing to GitHub events to kick off GitHub action workflows:**

```yaml
on: 
  discussion: 
    types: [created] 
```

## Requirements

Description about requirements to run this GitHub Action. 

Configure:

- Option 1
- Option 2
- Option 3

- More detailed configuration step.




## Inputs

| Name | Description | Requried? | Default |
| --- | --- | --- | --- |
| `GITHUB_TOKEN` | Ensure you create a PAT with `discussion: write` and `repo: write`, then add it as an github action secret in your repo. | **No** | `${{ secrets.GITHUB_TOKEN }}` | 
| `comment_body` | The contents of the autoresponder comment in string format. | **No** | `"This comment was generated by the Discussion Autoresponder GitHub Action."` |




## Outputs

| Name | Description | How To Access |
| --- | --- | --- |
| `ghaVar1` | Description about output1. | `${{ steps.<your-step>.outputs.variable1}}` |
| `ghaVar1` | Description about output2. | `${{ steps.<your-step>.outputs.variable2 }}` |




#### Accessing Outputs 
```yml
- name: Show Outputs
  run: |
    echo "variable1 = ${{ steps.<your-step>.outputs.variable1 }}"
    echo "variable2 = ${{ steps.<your-step>.outputs.variable2 }}"
```




## Example

Example [workflow](https://github.com/<your_github_username>/<github_repo>/<example_file>.yaml)

## Configuration

*If you fork this repository, ensure you enable workflows in the workflows tab.

## Credits

- [Link1](https://google.com)

### Inspired by:
- [Link2](https://google.com)
- [Link3](https://google.com)
