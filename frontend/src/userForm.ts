import tinymce from "tinymce";
import { init } from "./main";

const documentContainer = document.getElementById("documentContainer") as HTMLDivElement;
let userForm = document.getElementById("userForm") as HTMLDivElement;
let logoutBtnContainer = document.getElementById("logoutBtnContainer") as HTMLDivElement;
let greeting = document.getElementById("userGreeting") as HTMLParagraphElement;
let editorMode = document.getElementById("editorMode") as HTMLHeadingElement;
let publishedBaseUrl = "http://localhost:3000/";

export const generateLogoutForm = () => {
  //console.log("logged in")
  logoutBtnContainer.innerHTML = /*html*/ `
        <button id="logoutUserBtn">Logout</button>
    `;
  let logoutUserBtn = document.getElementById("logoutUserBtn") as HTMLButtonElement;
  logoutUserBtn.addEventListener("click", () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userid");

    greeting.innerText = "You have been logged out.";
    editorMode.innerText = "Welcome";
    tinymce.remove("#textbox");
    documentContainer.innerHTML = "";

    generateLoginForm();
  });
};

export const generateLoginForm = () => {
  //console.log("not logged in")
  logoutBtnContainer.innerHTML = "";
  userForm.innerHTML = /*html*/ `
    <p>New user? Create an account!</p>
    
    <input type="text" id="newUserName" placeholder="username"/>
    <input type="email" id="newEmail" placeholder="email"/>
    <input type="password" id="newPassword" placeholder="password"/>
    <button id="saveUserBtn">Create user</button>

    <p>Or login here:</p>
    <input type="text" id="loginEmail" placeholder="email" />
    <input type="password" id="loginPassword" placeholder="password" />
    <button id="loginUserBtn">Login</button>
    `;

  //create user
  const saveUserBtn = document.getElementById("saveUserBtn") as HTMLButtonElement;
  saveUserBtn.addEventListener("click", async () => {
    let newUserName = document.getElementById("newUserName") as HTMLInputElement;
    let newEmail = document.getElementById("newEmail") as HTMLInputElement;
    let newPassword = document.getElementById("newPassword") as HTMLInputElement;

    let newUser = {
      name: newUserName.value,
      email: newEmail.value,
      password: newPassword.value,
    };

    try {
      const response = await fetch(`${publishedBaseUrl}users/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (response.status === 409) {
        greeting.innerText = "Email or name already exist";
      } else if (data.name) {
        greeting.innerText = "";
        greeting.innerHTML += /*html*/ ` 
                    <p>User ${data.name} was succesfully created!<p>
                `;
      }
    } catch (err) {
      greeting.innerText = String(err);
    }

    newUserName.value = "";
    newEmail.value = "";
    newPassword.value = "";
  });

  //login user
  const loginUserBtn = document.getElementById("loginUserBtn") as HTMLButtonElement;
  loginUserBtn.addEventListener("click", async () => {
    let loginEmail = document.getElementById("loginEmail") as HTMLInputElement;
    let loginPassword = document.getElementById("loginPassword") as HTMLInputElement;

    let loginUser = {
      email: loginEmail.value,
      password: loginPassword.value,
    };
    try {
      const response = await fetch(`${publishedBaseUrl}users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginUser),
      });
      const data = await response.json();
      if (data[0].userName) {
        greeting.innerText = "";
        greeting.innerHTML += /*html*/ ` 
                    <p>You are logged in as ${data[0].userName}<p>
                `;
        localStorage.setItem("username", data[0].userName);
        localStorage.setItem("userid", data[0].id);
        init();
      }
      loginEmail.value = "";
      loginPassword.value = "";
      userForm.innerHTML = "";
    } catch (err) {
      console.log(err);
      greeting.innerText = "failed to login, please check your username or password and try again";
    }
  });
};
