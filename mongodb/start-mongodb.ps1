
$PATH_MONGODB = "D:\Workspace\Mongodb\mongodb-win32-x86_64-windows-5.0.6\bin"
Start-Process -NoNewWindow $PATH_MONGODB\mongod -ArgumentList "--dbpath .\data"
