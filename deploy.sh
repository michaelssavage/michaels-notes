#!/usr/bin/env sh

# abort on errors
set -e

# Run the build command
npm run build

# Run following command
#     to push "dist" folder to gh-pages subtree
#     use "-f" flag, since the default vite project ignores the dist folder while pushing code to github.
git add dist -f

# Commit changes
git commit -m "adding build folder"

# Run the following command, the command will
#     create gh-pages subtree
#     pushes changes to gh-pages
#     The "--prefix dist" will specify the dist folder for gh-pages subtree
git subtree push --prefix dist origin gh-pages

# Note gh-pages branch
#     Dedicated for github pages site
#     Contains the "/dist" folder contents

read -rn1