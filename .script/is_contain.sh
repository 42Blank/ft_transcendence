#!/bin/bash

# check if file contains $1
echo "try to find $1"
if [ ! -z "$(git diff origin/main | grep $1)" ]; then
    echo "$1 found"
    exit 0
else
    echo "no $1 found"
    exit 1
fi