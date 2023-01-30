#!/usr/bin/env bash
set -e

# collect args for editorconfig-cli
mapfile -t editorconfigargs < <(find . -type 'f' ! -name '*.png' ! -name 'LICENSE' ! -path './.git/*')

npx -q stylelint --quiet ./*.css
npx -q editorconfig-cli "${editorconfigargs[@]}"
npx -q eslint ./*.js
npx -q w3cjs ./*.html
