let publishedBaseUrl = "http://localhost:3000/"
let greeting = document.getElementById("userGreeting");

export const initDocumentEditor = () => {
    const documentContainer = document.getElementById("documentContainer");
    documentContainer.innerHTML= /*html*/`
        <textarea id="textbox" name="textbox" rows="29" cols="60"></textarea>
        <button id="saveDoc" class="submit">Save Document</button>
        <button id="undoDoc" class="submit">Undo</button>
        <div id="storedDoc"></div>
    `
    tinymce.init({
      
        selector: "#textbox",
        toolbar: "undo redo | blocks | styleselect | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
        
        setup: function(editor) {
            editor.on("change", function(){
                editor.save();
            })
        }
      });

      //undo content in editor
      document.getElementById("undoDoc").addEventListener("click", function(){
        let userName = localStorage.getItem("username");
        tinymce.get("textbox").setContent("");
        saveDoc.innerText = "Save Document";
        greeting.innerHTML = /*html*/` 
        <p>You are logged in as ${userName}<p>
        `;
      });
      
      fetchDocuments();
      createDocument();
}

const fetchDocuments = async () => {
    let userId = localStorage.getItem("userid");
    const response = await fetch(`${publishedBaseUrl}documents`,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({userId: userId})
    });
    try {
        const data = await response.json();
        printDocuments(data);

    } catch (err) {
        return console.log(err);
    }
}

const printDocuments = (documents) => {
    const storedDocuments = document.getElementById("storedDoc");
    console.log("printdocuments:",documents);
    storedDocuments.innerHTML = documents.map(document => {
        return /*html*/`
        <div id="document-${document.documentName}">
            
            <h3>${document.documentName}<h3>
            <p>${document.createDate.substring(0,19)}<p>
            
            <div id=${document.id}>
            ${document.documentContent}
            </div>

            <div class="btnContainer">
                <button id="editDoc">Edit</button>
                <button>Delete</button>
            </div>
        </div>
        `
    }).join('')

    document.addEventListener("click", e => {
        let saveDoc = document.getElementById("saveDoc");
        if(e.target.id === "editDoc"){
            const documentContent = e.target.parentNode.previousElementSibling.innerHTML;
            console.log(documentContent);
            tinymce.get("textbox").setContent(documentContent);
            greeting.innerText = "you are editing a document";
            saveDoc.innerText = "Save changes";
        }
    });

}

const createDocument = () => {
    let saveDoc = document.getElementById("saveDoc");
    saveDoc.innerText = "Save Document";

    let userId = localStorage.getItem("userid");
    saveDoc.addEventListener("click", async() =>{
        let docName = prompt("What would you like to name your document?"); //lazy dev :)
        const boxContent = document.getElementById("textbox").value;

        let newDocument = {
            name:  docName,
            content: boxContent,
            userId: userId
        }

        try {
            const response = await fetch(`${publishedBaseUrl}documents/add`,{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newDocument)
            });

            const data = await response.json();

            if (response.status === 201) {
                greeting.innerText = "Document was created";
                console.log(data);
                console.log(response);
            }

            else {
                greeting.innerText = "Something went wrong :(";
            }
        }
        catch(err) {
            greeting.innerText = err;
        }

        initDocumentEditor();   
    }) 
}





