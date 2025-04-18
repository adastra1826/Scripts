export PATH="/opt/homebrew/opt/openjdk/bin:$PATH"
alias icloud='cd ~/Library/Mobile\ Documents/com~apple~CloudDocs'
autoload zmv

cleanzip() {
	if [ $1 ]; then
		local dir="$1"
	else
		local dir=$(basename "$PWD")
	fi
	zip -r "$dir".zip . -x '*.DS_Store' -x '**__MACOSX' -x '*.zip'
}
