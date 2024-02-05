# File-Manager

### Notes for work ###
1. Beginning of work.Starting the program.
 ```bash
- npm run start -- --username=your_username
```
- You can not enter your username.
Leave it blank or specify " ". In this case, the program will call you Username.
 ```bash
-  npm run start -- --username=
```
`Welcome to the File Manager, Username!`

- Enter your name without spaces to get this answer
 ```bash
-  npm run start -- --username=BodnarAlex
```
`Welcome to the File Manager, BodnarAlex!`

- If you want the name to have spaces, then enclose the name in quotes.

 ```bash
-  npm run start -- --username="Bodnar Alex"
or
-  npm run start -- --username='Bodnar Alex'
```
`Welcome to the File Manager, Bodnar Alex!`


2. The program can be exited only using the following methods:

```bash
-  ctrl + c
- .exit
```

3. The program implements catching arguments using the following methods:
 ```bash
- rename text.txt textNew.txt
- rename 'text.txt' 'text New.txt'
- rename "text.txt" "text New.txt"
```

! Mixing spaces and quotes is not allowed.
! Spaces in names can only handle quoted argument.

There's no need to do this:
```bash
- rename text.txt text New.txt
- rename text.txt 'text New.txt'
- rename 'text.txt' "text New.txt"
```

If spaces are used in only one of several arguments, all arguments must also be wrapped in quotes.

4. Functions commpress and decompress add and remove extensions themselves.
You only need to select the file and destination path.
For example like this:

 ```bash
- compress src\files\catalog\c.txt src\files
- decompress src\files\c.txt.br src\files
```

4. If there is a pause after the `ls` command, then you may be in a directory with a lot of files. Please wait for them to load and display.

5. The program starts from the starting working directory. (for example, on Windows it's something like `C:\Users\Username`)

- For go upper from current directory use:
 ```bash
- up
```
This command will not take you higher if you are in the root folder (for example, on Windows it's something like `C:\` )
However, this is not considered an error, since it does not rise above the root directory.

- For to dedicated folder from current directory use:
 ```bash
- cd path_to_directory
```
You can use quotes to handle paths with spaces. See point three

6. To specify the current directory use `.`
For example, this function unpacks a file from the file directory to where you are now:

 ```bash
- decompress src\files\catalog\c.txt .
```

7. For easier checking, a directory with subdirectories has been created "files"

 ```bash
- cd src\files
```
8. For rename, enter the path and file name. Two ways in arguments will lead to errors.

It is good:
 ```bash
- rn src\files\c.txt d.txt
```

Is is not:
 ```bash
- rn src\files\c.txt src\files\d.txt
```

8. Entering folder names instead of file names will result in an error:
 ```bash
- Invalid input
```