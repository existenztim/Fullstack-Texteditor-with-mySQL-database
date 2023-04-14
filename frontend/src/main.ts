import "./style.css";
import { initDocumentEditor } from "./handleDocuments";
import { generateLoginForm, generateLogoutForm } from "./userForm";

export const init = () => {
  if (localStorage.getItem("username")) {
    let userName = localStorage.getItem("username");
    let greeting = document.getElementById("userGreeting") as HTMLParagraphElement;
    let editorMode = document.getElementById("editorMode") as HTMLHeadingElement;
    greeting.innerHTML = /*html*/ ` 
        <p>You are logged in as ${userName}</p>
        `;
    editorMode.innerHTML = /*html*/ ` 
        <h2>Create document</h2>
        `;
    generateLogoutForm();
    initDocumentEditor();
  } else {
    generateLoginForm();
  }
};
init();
