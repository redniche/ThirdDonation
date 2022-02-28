# ThirdDonation Contributing Guide

Hi! I'm really excited that you are interested in contributing to ThirdDonation. Before submitting your contribution, please make sure to take a moment and read through the following guidelines:

- [ThirdDonation's code of conduct](CODE_OF_CONDUCT.md)
- [Setting up your framework development environment](README.md)
- [Pull Request Guidelines](#pull-request-guidelines)

## Helping out in the issue database

If you want to help us triage, you are very welcome to do so!

- Read [our code of conduct](CODE_OF_CONDUCT.md), which stipulates explicitly
  that everyone must be gracious, respectful, and professional. If you're helping out
  with triage, you are representing the ThirdDonation team, and so you want to make sure to
  make a good impression!

## Pull Request Guidelines

### General

If you want to contribute to the repository, here's a quick guide:

- The `master` branch is just a snapshot of the latest stable release. All development should be done in dedicated branches. **Do not submit PRs against the `master` branch.**

- Checkout a topic branch from the relevant branch, e.g. `develop/~`, and merge back against that branch.

- Work in the `{branch_related_folder}/src` folder and **DO NOT** checkin `dist` in the commits.

- It's OK to have multiple small commits as you work on the PR - GitHub will automatically squash it before merging.

- The pull requests will be reviewed and eventually merged into the repo or rejected. See ["Fork-a-Repo"](https://help.github.com/articles/fork-a-repo/) for how this works.

### Frontend

1. Fork the repository and make your working branch.
2. Make sure `npm test` passes. (see [Developing for ThirdDonation](#Developing-for-ThirdDonation))
3. If adding a new feature:

   - Add accompanying test case.
   - Provide a convincing reason to add this feature. Ideally, you should open a suggestion issue first and have it approved before working on it.

4. If fixing bug:

   - If you are resolving a special issue, add `(fix #xxxx[,#xxxx])` (#xxxx is the issue id) in your PR title for a better release log, e.g. `update entities encoding/decoding (fix #3899)`.
   - Provide a detailed description of the bug in the PR. Live demo preferred.
   - Add appropriate test coverage if applicable.

5. Push to your fork and submit a pull request to the **develop/frontend** branch

### Backend

1. Fork the repository and make your working branch.
2. Create a `application.properties` into /third*donation_server/src/main/resources. *[You can get help](https://gist.github.com/kskim217/89fb283aa8a75a183de63bda598f6d02)\_
3. develop and test your code changes, gradle: `gradlew test`.

   - Run checkstyle: `gradlew check`. 🏁
   - Create minimal diffs - disable on save actions like reformat source code or organize imports. If you feel the source code should be reformatted create a separate PR for this change.
   - Check for unnecessary whitespace with git diff --check before committing.

4. Make the test pass
5. Commit your changes:

   - Use the present tense (`"feat #4: Add feature"` not `"feat #4: Added Feature"`)
   - Use the imperative mood (`"fix #5: Move cursor to…"` not `"fix #5: Moves cursor to…"`)

6. Push to your fork and submit a pull request to the **develop/backend** branch

### Blockchain

As a contributor, you are expected to fork this repository, work on your own fork(working branch) and then submit pull requests.  
Blockchain is still in its infancy. It may take a long review before it is more established.

## Developing for ThirdDonation

To develop for ThirdDonation, you will eventually need to become familiar
with our processes and conventions. This section lists the documents
that describe these methodologies. The following list is ordered: you
are strongly recommended to go through these documents in the order
presented.

1. [Our code of conduct](CODE_OF_CONDUCT.md), which stipulates explicitly
   that everyone must be gracious, respectful, and professional. This
   also documents our conflict resolution policy and encourages people
   to ask questions.

2. [Setting up your framework development environment](README.md),
   which describes the steps you need to configure your computer to
   work on ThirdDonation's framework. ThirdDonation's framework uses Spring boot and Vue.js

## Commit Convention

- Tag according to the table below.
- Add a Git issue number related to the commit.
- ex) `feat #xxxx[,#xxxx]: Add new feature in develop/tempbranch`  
  xxxx is number.
  | Tag Name | Description |
  | -------- | --------------------------------------------------------------------------------------- |
  | feat | Attach this tag when adding a new feature to the “develop/{back,front}end/feature name” branch |
  | release | Attach this tag when the commit that will be release |
  | fix | Non-urgent bug fixes. Bugfixes that occurred in branches other than master and release. |
  | !hotfix | Urgent bug fixes. Bugfixes that occurred in master and release branches. |
  | dosc | Attach this tag when the document has been modified |
  | test | Add tests, refactor tests (not changed production code) |

---

This text is written with reference in ([watson-developer-cloud/spring-boot-starter](https://github.com/watson-developer-cloud/spring-boot-starter/blob/master/.github/CONTRIBUTING.md), [vuejs/vue](https://github.com/vuejs/vue/blob/dev/.github/CONTRIBUTING.md), [flutter/flutter](https://github.com/flutter/flutter/blob/master/CONTRIBUTING.md))
