import {generateLoginForm, generateLogoutForm} from './script/userForm.js';
import {initDocumentEditor} from './script/handleDocuments.js';
//let publishedBaseUrl = "http://localhost:3000/"

export const init = () => {
    if(localStorage.getItem("username")) {
        let userName = localStorage.getItem("username");
        let greeting = document.getElementById("userGreeting");
        greeting.innerHTML = /*html*/` 
        <p>You are logged in as ${userName}<p>
        `;
        generateLogoutForm();
        initDocumentEditor();
    } else {
        generateLoginForm();
    }
}
init();
