# Getting Started

1. The easiest way to get started is to click the green "<> code" button and press "download as zip".
2. Open the project in a code editor (preferably Visual Studio Code).
3. Open the terminal and go to the root of the backend folder (e.g. via cd backend).
4. Then download all dependencies using git install.
5. Do the same steps in the root of the frontend folder.
6. Import the notes-tim-sundell.sql (preferably in phpMyAdmin).
7. Rename the .envtest in the backend folder to .env and replace the variables with your own values (e.g. if you need or changed anything).
8. Now go to your backend folder and type npm start in your terminal (if you have nodemon installed globally).
9. If you don't have nodemon installed globally you have two options:

   1. Either install nodemon globally.
   2. Or go to package.json and change the line "start": "nodemon ./bin/www" to: "start": "node ./bin/www".

10. Once you get the command working, go to your frontend folder and start index.html with live-server.
    Have fun!
