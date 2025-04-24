#!/bin/bash

# Script: commit.sh
# Description: Commits the repository in its current state.
# Usage: ./commit.sh [commit message]
# If no commit message is provided, a timestamp will be used.

# Find the git repository root directory
if ! REPO_ROOT=$(git rev-parse --show-toplevel); then
    echo "Error: Not in a git repository."
    exit 1
fi

# Change to the repository root
cd "$REPO_ROOT" || return

# Check if there are changes to commit
if [ -n "$(git status --porcelain)" ]; then
    # Add all changes to staging
    git add .
    
    # Use provided commit message or generate one with timestamp
    if [ -n "$1" ]; then
        COMMIT_MSG="$1"
    else
        COMMIT_MSG="Auto-commit: $(date '+%Y-%m-%d %H:%M:%S')"
    fi
    
    # Commit the changes
    if git commit -m "$COMMIT_MSG"; then
        echo "Changes committed successfully with message: $COMMIT_MSG"
    else
        echo "Error: Failed to commit changes."
        exit 1
    fi
else
    echo "No changes to commit."
fi