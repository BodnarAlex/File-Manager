# File-Manager

### Notes for work ###
1. The program implements catching arguments using the following methods:
- rename text.txt textNew.txt
- rename 'text.txt' 'textNew.txt'
- rename "text.txt" "textNew.txt"

Spaces in names can only handle quoted argument.

If spaces are used in only one of several arguments, all arguments must also be wrapped in quotes.

2. Functions commpress and decompress add and remove extensions themselves.
You only need to select the file and destination path.
For example like this:
- compress src\files\catalog\c.txt src\files
- decompress src\files\c.txt.br src\files

3. You can not enter --username=YourUsername.
Leave it blank or specify " ". In this case, the program will call you Username.

- npm run start -- --username= or npm run start --
- Welcome to the File Manager, Username!