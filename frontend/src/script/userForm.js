let userForm = document.getElementById("userForm");
const greeting = document.getElementById("userGreeting");
let publishedBaseUrl = "http://localhost:3000/"

export const generateLogoutForm = () => {
console.log("not logged in")
}

export const generateLoginForm = () => {
    console.log("logged in")
    userForm.innerHTML= /*html*/`
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

    saveUserBtn.addEventListener("click", async () => {  
        let newUserName = document.getElementById("newUserName");
        let newEmail = document.getElementById("newEmail");
        let newPassword = document.getElementById("newPassword");

        let newUser = {
            name: newUserName.value,
            email: newEmail.value,
            password: newPassword.value
        }

        try {
            const response = await fetch(`${publishedBaseUrl}users/add`,{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser)
            });
    
            const data = await response.json();
            if (data.name) {
                greeting.innerText = "";
                greeting.innerHTML += /*html*/` 
                    <p>User ${data.name} was succesfully created!<p>
                `;
            }
        }
        catch(err) {
            greeting.innerText = err;
        }
    });
}