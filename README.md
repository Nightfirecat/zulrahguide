# Zulrah Guide [![Build Status](https://travis-ci.org/Nightfirecat/zulrahguide.svg?branch=master)](https://travis-ci.org/Nightfirecat/zulrahguide)

Based on [http://zulrahguide.com](https://web.archive.org/web/20180224034652/http://zulrahguide.com/),
re-created for continued use and future updates.

Credit to JonTarg for the original ZulrahGuide.com website

## Building

This site is currently built entirely from static files and requires no build process to be ready
for browser display; simply pointing your browser at `index.html` or any of the other HTML pages
will be the same [as visiting the GitHub page for this
project](https://nightfirecat.github.io/zulrahguide/).

With that said, this project uses [npm](https://www.npmjs.com/) for development dependency
versioning and within the CI script for test execution. Running said tests (for compliance against
the project's
[EditorConfig](https://editorconfig.org/), [csslint](https://github.com/CSSLint/csslint), and
[eslint](https://github.com/eslint/eslint) rules and validating the HTML) is as simple as
installing said dependencies and running the bash script in the `.travis` directory.

```sh
npm i
.travis/test.sh
```
