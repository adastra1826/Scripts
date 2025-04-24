#!/bin/bash

# Script: compile_docs.sh
# Description: Compiles all numbered .md files from manual directory and all .py files from model directory
# Usage: ./compile_docs.sh [a|b]

# Function to display script usage
usage() {
    echo "Usage: $0 [a|b]"
    echo "  a - Use amodel"
    echo "  b - Use bmodel"
    echo "If no argument is provided, you will be prompted to choose."
}

# Check for help flag
if [ "$1" = "-h" ] || [ "$1" = "--help" ]; then
    usage
    exit 0
fi

# Function to validate model choice
validate_choice() {
    local choice="$1"
    case "$choice" in
        a|A)
            echo "amodel"
            return 0
            ;;
        b|B)
            echo "bmodel"
            return 0
            ;;
        *)
            return 1
            ;;
    esac
}

# Get and validate model choice
if [ -z "$1" ]; then
    # No argument provided, prompt for input
    read -pr "Please enter model choice [a/b]: " choice
    MODEL_DIR=$(validate_choice "$choice")
    if [ $? -ne 0 ]; then
        echo "Error: Invalid choice '$choice'. Please specify 'a' for amodel or 'b' for bmodel."
        exit 1
    fi
else
    # Argument provided, validate it
    MODEL_DIR=$(validate_choice "$1")
    if [ $? -ne 0 ]; then
        echo "Error: Invalid argument '$1'. Please specify 'a' for amodel or 'b' for bmodel."
        usage
        exit 1
    fi
fi

# Output will be named after the model type
OUTPUT_FILENAME="${MODEL_DIR}.md"

echo "Using model: $MODEL_DIR"

# Set directories using relative paths (assuming script is in scripts/ directory)
SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"
MANUAL_DIR="$SCRIPT_DIR/../../training/text/manual"
MODEL_DIR="$SCRIPT_DIR/../../project/$MODEL_DIR"
OUTPUT_DIR="$SCRIPT_DIR/../../training/text/generated"
OUTPUT_PATH="$OUTPUT_DIR/$OUTPUT_FILENAME"

# Check if output directory exists, create if not
if [ ! -d "$OUTPUT_DIR" ]; then
    echo "Creating output directory: $OUTPUT_DIR"
    mkdir -p "$OUTPUT_DIR"
    if [ $? -ne 0 ]; then
        echo "Error: Failed to create output directory at $OUTPUT_DIR"
        exit 1
    fi
fi

# Check if directories exist
if [ ! -d "$MANUAL_DIR" ]; then
    echo "Error: Manual directory not found at $MANUAL_DIR"
    exit 1
fi

if [ ! -d "$MODEL_DIR" ]; then
    echo "Error: Model directory not found at $MODEL_DIR"
    exit 1
fi

echo "Compiling documentation from:"
echo "- MD files: $MANUAL_DIR"
echo "- Python files: $MODEL_DIR"
echo "Output will be saved to: $OUTPUT_PATH"

# Start with an empty file
: > "$OUTPUT_PATH"

# Process markdown files in numerical order
echo "Processing markdown files..."
for md_file in $(find "$MANUAL_DIR" -type f -name "*.md" | sort -V); do
    echo "  - Including: $(basename "$md_file")"
    cat "$md_file" >> "$OUTPUT_PATH"
    echo -e "\n" >> "$OUTPUT_PATH"  # Add two newlines after each MD file
done

# Process Python files
echo "Processing Python files..."
for py_file in $(find "$MODEL_DIR" -type f -name "*.py" | sort); do
    filename=$(basename "$py_file")
    echo "  - Including: $filename"
    
    # Add filename and code block syntax
    echo "$filename" >> "$OUTPUT_PATH"
    echo '```python' >> "$OUTPUT_PATH"
    
    # Add file contents
    cat "$py_file" >> "$OUTPUT_PATH"
    
    # Close code block and add newlines
    echo -e "\n\`\`\`\n" >> "$OUTPUT_PATH"
done

echo "Compilation complete! Documentation saved to $OUTPUT_PATH"