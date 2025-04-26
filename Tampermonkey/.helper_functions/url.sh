#!/bin/bash

baseURL="https://raw.githubusercontent.com/adastra1826/Scripts/refs/heads/main/Tampermonkey/"
matches=("@downloadURL" "@updateURL")

for file in ../*.user.js; do
    [ -e "$file" ] || continue
    echo "Checking $file"
    fileName="$(basename "$file")"

    for match in "${matches[@]}"; do
        correct="//[[:blank:]]*${match}[[:blank:]]*${baseURL}${fileName}$"
        if grep -qE "$correct" "$file"; then
            continue
        fi

        echo "    ...updating $match"
        sed -Ei '' "s|^(//[[:blank:]]${match}[[:blank:]]*).*|\1${baseURL}${fileName}|" "$file"
    done
done