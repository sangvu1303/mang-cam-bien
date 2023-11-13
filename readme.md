```json
    "Author"      :    "Sáng Vũ",
    "Project"     :    "Mạng Cảm Biến - PTIT",
    "Description" :    "Dùng Esp8266 , NodeJS , Sequelize , Socket.io tạo dashboard hiển thị số liệu & chart từ database"
    "Start"       :    "1/11/2023"
    "Finish"      :    "11/11/2023"
```

### Setup NodeJs Version from NVM

    Download : https://github.com/coreybutler/nvm-windows/releases

    nvm-windows runs in an Admin shell. You'll need to start powershell or Command Prompt as Administrator to use nvm-windows

    nvm -v

    nvm list

    nvm install a.b.c

    nvm use a.b.c

### NodeJs(Express):

    npm init

    npm install --save body-parser@1.20.2 dotenv@10.0.0 ejs@3.1.9 express@4.18.2 cors@2.8.5 socket.io@4.7.2

    npm install --save-dev @babel/core@7.15.5 @babel/preset-env@7.15.6 @babel/node@7.15.4 nodemon@3.0.1

### MySql(Sequelize): using ORM instead of query

    npm install --save-dev sequelize@6.33.0 sequelize-cli@6.6.1

    npm i mysql2

    cd src

    npx sequelize-cli init

    npx sequelize-cli db:migrate

> > example:

    npx sequelize-cli model:generate --name MCB --attributes temperature:float,humidity:float,light:float --> change file mcb.js --> create all file models & migration --> copy & paste code

    npx sequelize-cli db:migrate // it is code what create database in mysql

    npx sequelize-cli seed:generate --name demo-user // create fake database for test

    npx sequelize-cli db:seed:all

### Git

    git init

    git add .

    git commit -m '....'

    git remote add mcb git@github.com:{yourAccount}/{yourProjectName}.git

    git push mcb master

### Download

    Koala : http://koala-app.com/   (css)

    Postman : https://www.postman.com/downloads/   (api)
### Picture 

![image](https://github.com/sangvu1303/mang-cam-bien/assets/103579421/f67c7858-9dd7-4d3c-adb6-c40a733264be)

![image](https://github.com/sangvu1303/mang-cam-bien/assets/103579421/3a0cd742-3b53-4037-a085-a684d2600873)

![image](https://github.com/sangvu1303/mang-cam-bien/assets/103579421/a513b567-be5e-4839-88ef-01de29a7798b)
