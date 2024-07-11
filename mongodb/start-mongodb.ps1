
$PATH_MONGODB = "D:\Workspace\Mongodb\mongodb-win32-x86_64-windows-5.0.6\bin"

Start-Process $PATH_MONGODB\mongod -ArgumentList "--replSet rs0 --dbpath .\data2 --port 27027"
Start-Process $PATH_MONGODB\mongod -ArgumentList "--replSet rs0 --dbpath .\data3 --port 27037"
Start-Process $PATH_MONGODB\mongod -ArgumentList "--replSet rs0 --dbpath .\data4 --port 27047"

# rs.initiate( { _id: "rs0", members: [ { _id: 0, host: "localhost:27027" }, { _id: 1, host: "localhost:27037" }, { _id: 2, host: "localhost:27047" } ] } );