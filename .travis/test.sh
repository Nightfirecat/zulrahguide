#!/bin/bash
set -e

# collect args for editorconfig-cli
mapfile -t editorconfigargs < <(find . -type 'f' ! -name '*.png' ! -name 'LICENSE' ! -path './.git/*')

shellcheck "${BASH_SOURCE[0]}" # run shellcheck on this file
npx csslint --quiet ./*.css
npx editorconfig-cli "${editorconfigargs[@]}"
npx eslint ./*.js
npx w3cjs ./*.html
