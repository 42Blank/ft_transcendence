#!/bin/bash

# return if folder is updated
# 0: updated
# 1: not updated

# check if folder exists
if [ ! -d "$1" ]; then
    echo "Folder $1 does not exist"
    exit 1
fi

echo "---"
git diff --name-only origin/main;
echo "---"
git diff --name-only main;
echo "---"
git diff --name-only main HEAD^;
echo "---"
git diff --name-only origin/main origin/${GITHUB_HEAD_REF}
echo "---"

# check if folder is updated
if [ ! -z "$(git diff --name-only origin/main origin/${GITHUB_HEAD_REF} | cut -d '/' -f 1 | uniq | grep $1)" ]; then
    echo "Folder $1 is updated"
    exit 0
else
    echo "Folder $1 is not updated"
    exit 1
fi