#!/bin/bash

# check if test file is in __test__ folder
if [ ! -z "$(git diff --name-only origin/main | grep test.ts | grep -v __test__)" ]; then
    exit 1
else
    exit 0
fi