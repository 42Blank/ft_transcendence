#!/bin/bash

# check if test file is in __test__ folder
if [ ! -z "$(git diff --name-only --diff-filter=acmr origin/main | grep test.ts | grep -v __test__)" ]; then
    echo "Test file is not in __test__ folder"
    exit 1
else
    echo "Test file is in __test__ folder"
    exit 0
fi