#!/bin/bash
# 1. Stage all changes
# 2. Set the commit message to a default one or, if any arguments are provided, treat that entire line as the commit message
# 3. Push

git add .

if [ $# -eq 0 ]
then
    message="Iterate userscript. [Auto generated commit message]"
else
    message="$*"
fi

git commit -m "$message"
git push