import {generateLoginForm, generateLogoutForm} from './script/userForm.js';
import {fetchDocuments} from './script/handleDocuments.js';
let publishedBaseUrl = "http://localhost:3000/"

export const init = () => {
    if(localStorage.getItem("username")) {
        generateLogoutForm();
        fetchDocuments();
    } else {
        generateLoginForm();
    }
}
init();