#!/bin/bash
set -e

# collect args for editorconfig-cli
mapfile -t editorconfigargs < <(find . -type 'f' ! -name '*.png' ! -name 'LICENSE' ! -path './.git/*')

shellcheck "${BASH_SOURCE[0]}" # run shellcheck on this file
npx -q csslint --quiet ./*.css
npx -q editorconfig-cli "${editorconfigargs[@]}"
npx -q eslint ./*.js
npx -q w3cjs ./*.html
