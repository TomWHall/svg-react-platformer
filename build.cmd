call npx "tsc"
if exist "build" rmdir /q/ s "build"
mkdir "build"
xcopy "src\index.html" "build\"
xcopy "src\js\*.js" "build\js\" /e
xcopy "src\css\*.css" "build\css\" /e