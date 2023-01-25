#!/bin/bash

# return if folder is updated
# 0: updated
# 1: not updated

# check if folder exists
if [ ! -d "$1" ]; then
    echo "Folder $1 does not exist"
    exit 1
fi

git fetch origin main

# check if folder is updated
if [ ! -z "$(git diff --name-only origin/main | cut -d '/' -f 1 | uniq | grep $1)" ]; then
    echo "Folder $1 is updated"
    exit 0
else
    echo "Folder $1 is not updated"
    exit 1
fi