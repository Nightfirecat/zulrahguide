#!/bin/bash
set -e

# collect args for editorconfig-cli
mapfile -t editorconfigargs < <(find . -type 'f' ! -name '*.png' ! -name 'LICENSE' ! -name 'yarn-error.log' ! -path './node_modules/*' ! -path './.git/*')

shellcheck "${BASH_SOURCE[0]}" # run shellcheck on this file
yarn run csslint --quiet ./*.css
yarn run editorconfig-cli "${editorconfigargs[@]}"
yarn run eslint ./*.js
yarn run w3cjs ./*.html
