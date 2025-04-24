#!/bin/bash

# Script: create_venv.sh
# Description: This script creates a Python virtual environment, initializes a Git repository, copies contents from a default folder, and opens VSCode.
# Usage: create_venv.sh [venv_name]

# Function to display script usage
usage() {
    echo "Usage: $0 [venv_name]"
    echo "If venv_name is not provided, 'venv' will be used as the default name."
}

# Function to get next available folder name
get_unique_folder_name() {
    local base_name=$1
    local folder_name=$base_name
    local counter=1

    while [ -d "$folder_name" ]; do
        folder_name="${base_name}_${counter}"
        counter=$((counter + 1))
    done

    echo "$folder_name"
}

# Check if Python3 is installed
if ! command -v python3 &> /dev/null; then
    echo "Error: Python3 is not installed. Please install Python3 and try again."
    exit 1
fi

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "Error: Git is not installed. Please install Git and try again."
    exit 1
fi

# Check if VSCode (code command) is installed
if ! command -v code &> /dev/null; then
    echo "Error: VSCode command-line tool 'code' is not installed or not in PATH."
    echo "Please ensure VSCode is installed and the 'code' command is available."
    exit 1
fi

# Set the virtual environment name
BASE_VENV_NAME=${1:-venv}
VENV_NAME=$(get_unique_folder_name "$BASE_VENV_NAME")

# Inform user if name was modified
if [ "$VENV_NAME" != "$BASE_VENV_NAME" ]; then
    echo "Note: Directory '$BASE_VENV_NAME' already exists. Using '$VENV_NAME' instead."
fi

# Create the virtual environment
echo "Creating virtual environment: $VENV_NAME"
python3 -m venv "$VENV_NAME"

# Check if venv creation was successful
if [ $? -ne 0 ]; then
    echo "Error: Failed to create virtual environment. Please check your Python installation and try again."
    exit 1
fi

# Copy contents of cvab_default folder (located in ~/bin) to the new virtual environment directory
DEFAULT_FOLDER="$HOME/bin/cvab_default"
if [ -d "$DEFAULT_FOLDER" ]; then
    echo "Copying contents from $DEFAULT_FOLDER to $VENV_NAME"
    cp -r "$DEFAULT_FOLDER"/. "$VENV_NAME"/
    if [ $? -ne 0 ]; then
        echo "Error: Failed to copy contents from $DEFAULT_FOLDER to $VENV_NAME."
        exit 1
    fi
else
    echo "Warning: Default folder $DEFAULT_FOLDER does not exist. Skipping copy step."
fi

# Activate the virtual environment
echo "Activating virtual environment"
source "$VENV_NAME/bin/activate"

# Check if activation was successful
if [ $? -ne 0 ]; then
    echo "Error: Failed to activate virtual environment. Please check the script and try again."
    exit 1
fi

# Initialize a Git repository in the virtual environment folder
echo "Initializing Git repository in $VENV_NAME"
cd "$VENV_NAME" || exit 1
git init

# Check if Git initialization was successful
if [ $? -ne 0 ]; then
    echo "Error: Failed to initialize Git repository."
    exit 1
fi

# Create a .gitignore file to ignore the virtual environment files
echo "Creating .gitignore file"
cat <<EOT > .gitignore
# Virtual environment
bin/
include/
lib/
lib64/
pyvenv.cfg
share/
EOT

# Stage the .gitignore file and any copied files
git add .

# Check if there are files to commit
if [ -n "$(git status --porcelain)" ]; then
    git commit -m "Initial commit: Add .gitignore and default project structure"
else
    echo "Note: No files to commit. Git repository is initialized but empty."
fi

# Print success message for Git initialization
echo "Git repository initialized successfully."

# Navigate back to the parent directory
cd ..

# Print success message
echo "Virtual environment '$VENV_NAME' has been created and activated successfully."

# Remind user to run script with source if they didn't
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    echo "Note: To persist the virtual environment activation in your current shell session, run this script using the source command:"
    echo "source $0 [venv_name]"
fi

# Open VSCode in the newly created virtual environment directory
echo "Opening VSCode in $VENV_NAME"
code "$VENV_NAME"