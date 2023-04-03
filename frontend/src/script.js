import {generateLoginForm, generateLogoutForm} from './script/userForm.js';
let publishedBaseUrl = "http://localhost:3000/"

export const init = () => {
    if(localStorage.getItem("username")) {
        generateLogoutForm();
    } else {
        generateLoginForm();
    }
}
init();