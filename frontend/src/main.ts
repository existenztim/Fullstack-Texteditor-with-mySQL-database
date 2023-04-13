import "./style.css";
import { initDocumentEditor } from "./handleDocuments";
import { generateLoginForm, generateLogoutForm } from "./userForm";

export const init = () => {
  if (localStorage.getItem("username")) {
    let userName = localStorage.getItem("username");
    let greeting = document.getElementById("userGreeting") as HTMLParagraphElement;
    greeting.innerHTML = /*html*/ ` 
        <p>You are logged in as ${userName}<p>
        `;
    generateLogoutForm();
    initDocumentEditor();
  } else {
    generateLoginForm();
  }
};
init();
