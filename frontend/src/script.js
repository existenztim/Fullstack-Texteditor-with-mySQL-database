import {generateLoginForm, generateLogoutForm} from './script/userForm.js';
import {initDocumentEditor} from './script/handleDocuments.js';
let publishedBaseUrl = "http://localhost:3000/"

export const init = () => {
    if(localStorage.getItem("username")) {
        generateLogoutForm();
        initDocumentEditor();
    } else {
        generateLoginForm();
    }
}
init();