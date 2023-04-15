# Notes - a texteditor with a local mySql database!

This is a fullstack app that lets you create,read,update and delete text documents that are user specific.

![demo1](https://user-images.githubusercontent.com/100682425/232146673-95b2ac40-5772-44df-bfbf-a3cc3bc4463a.png)
![demo2](https://user-images.githubusercontent.com/100682425/232256191-2713bfc9-c051-492d-bfa0-d13cd5e3f48f.png)

# Getting Started

Before you follow these steps make sure you have node and git installed on your computer.

1. The easiest way to get started is to click the green "<> code" button and press "download as
   zip".
2. Open the project in a code editor (preferably Visual Studio Code).
3. Open the terminal and go to the root of the backend folder (e.g. via [cd backend]).
4. Then download all dependencies using git install.
5. Do the same steps in the root of the frontend folder (switch with command [cd ..] then [cd
   frontend]).
6. Import the notes-tim-sundell.sql (preferably in phpMyAdmin).
7. Rename the .envtest in the backend folder to .env and replace the variables with your own values
   (e.g. if you need or changed anything).
8. Now go to your backend folder and type [npm start] in your terminal (if you have nodemon
   installed globally).
9. If you don't have nodemon installed globally you have two options:

   1. Either install nodemon globally.
   2. Or go to package.json and change the line "start": "nodemon ./bin/www" to: "start": "node
      ./bin/www".

10. Start the Apache/MySQL server (e.g. via MAMP).
11. Navigate to the frontend folder via the terminal.
12. Type [npm run dev] and follow the link in the browser. Have fun!

# User password

The passwords of the users are encrypted in the database. So to make life easier for you here are the
information you need to login as any of the already existing users:

test@gmail.com with password : test123      (has 1 document created)

demo@gmail.com with password : demo123      (has 3 documents created)

johnDoe@gmail.com with password : johnDoe   (has 3 documents created)

# Code Stack

Frontend:
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)

Backend:
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
