let publishedBaseUrl = "http://localhost:3000/"
let greeting = document.getElementById("userGreeting");

export const initDocumentEditor = () => {
    const documentContainer = document.getElementById("documentContainer");
    documentContainer.innerHTML= /*html*/`
        <textarea id="textbox" name="textbox" rows="29" cols="60"></textarea>
        <button id="saveDoc" class="submit">Save Document</button>
        <button id="removeDoc" class="submit">Clear Document</button>
        <div id="preview"></div>
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
        console.log(`${userId}: documents `,data);
        // console.log(response);

    } catch (err) {
        return console.log(err);
    }
}

const createDocument = () => {
    const saveDoc = document.getElementById("saveDoc");

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





