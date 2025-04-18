#!/bin/bash

# Script: commit.sh
# Description: Commits the repository in its current state.

# Check if there are changes to commit
if [ -n "$(git status --porcelain)" ]; then
    git add .
    git commit -m "Auto-commit: $(date '+%Y-%m-%d %H:%M:%S')"
    echo "Changes committed successfully."
else
    echo "No changes to commit."
fi