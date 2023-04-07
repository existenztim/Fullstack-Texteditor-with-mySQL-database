let publishedBaseUrl = "http://localhost:3000/";
let greeting = document.getElementById("userGreeting");

export const initDocumentEditor = () => {
  const documentContainer = document.getElementById("documentContainer");
  documentContainer.innerHTML = /*html*/ `
        <h2 id="editorMode" class="centeredH2">Create Document</h2>
        <textarea id="textbox" name="textbox" rows="29" cols="60"></textarea>
        <div id="editorBtns">
          <button id="saveDoc" class="submit">Save a new document</button>
          <button id="undoDoc" class="submit">Undo</button>
        </div>
        <h2 class="centeredH2">Your saved documents:<h2>
        <div id="storedDoc" ></div>
    `;
  tinymce.init({
    selector: "#textbox",
    toolbar:
      "undo redo | blocks | styleselect | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",

    setup: function (editor) {
      editor.on("change", function () {
        editor.save();
      });
    },
  });

  //undo content in editor
  document.getElementById("undoDoc").addEventListener("click", function () {
    tinymce.get("textbox").setContent("");
    saveDoc.innerText = "Save a new document";
    editorMode.innerText = "Create Document";
    if (document.getElementById("updateDoc")) {
      document.getElementById("updateDoc").remove();
    }
  });

  fetchDocuments();
  createDocument();
};

const fetchDocuments = async () => {
  let userId = localStorage.getItem("userid");
  const response = await fetch(`${publishedBaseUrl}documents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId: userId }),
  });
  try {
    const data = await response.json();
    printDocuments(data);
  } catch (err) {
    return console.log(err);
  }
};

const printDocuments = (documents) => {
  const storedDocuments = document.getElementById("storedDoc");
  storedDocuments.innerHTML = documents
    .map((document) => {
      return /*html*/ `
        <div id="document-${document.documentName}">
            
            <div class="headerContainer">
                <h3>${document.documentName}<h3>
                <p>${document.createDate.substring(0, 19)}<p>
            </div>

            <div id=${document.id} class="contentContainer">
            ${document.documentContent}
            </div>

            <div class="btnContainer">
                <button id="${
                  document.documentName
                }-editBtn" data-document-id="${document.id}">Edit</button> 
                <button id="${
                  document.documentName
                }-deleteBtn" data-document-id="${document.id}">Delete</button> 
            </div>
        </div>
        `;
    })
    .join("");
  addBtnsEventlistener();
};

const addBtnsEventlistener = () => {
  //edit btn
  let addEditEvent = document.querySelectorAll('[id$="-editBtn"]');
  addEditEvent.forEach((button) =>
    button.addEventListener("click", () => {
      const documentId = button.getAttribute("data-document-id");
      const documentContent = document.getElementById(documentId).innerHTML;
      let parentName = document.getElementById(documentId).parentNode.id;
      let editorMode = document.getElementById("editorMode");

      tinymce.get("textbox").setContent(documentContent);
      window.scrollTo(0, document.querySelector("#textbox").offsetTop); //scroll to editor

      editorMode.innerText = `You are editing ${parentName}`;
      editorMode.innerText = editorMode.innerText.replace(/-/g, ": ");
      editDocument(documentId, parentName, documentContent, editorMode);
    })
  );
  //delete btn
  let addDeleteEvent = document.querySelectorAll('[id$="-deleteBtn"]');
  addDeleteEvent.forEach((button) =>
    button.addEventListener("click", async () => {
      const documentId = button.getAttribute("data-document-id");

      let updateDocument = {
        id: documentId,
      };

      try {
        const response = await fetch(`${publishedBaseUrl}documents/delete`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateDocument),
        });

        await response.json();

        if (response.status === 200) {
          greeting.innerText = `you deleted document with id:${documentId} `;
        } else {
          greeting.innerText = "Something went wrong :(";
        }
      } catch (err) {
        greeting.innerText = err;
      }

      initDocumentEditor();
    })
  );
};

const editDocument = (documentIdToUpdate, documentName, contentToUpdate) => {
  if (document.getElementById("updateDoc")) {
    document.getElementById("updateDoc").remove();
  }
  // innerHTML += will remove eventListeners, therefor solution below
  document
    .getElementById("editorBtns")
    .insertAdjacentHTML(
      "afterbegin",
      /*html */ `<button id="updateDoc" data-document-id="${documentIdToUpdate}" class="submit">update ${documentName}</button>`
    );

  const updateDoc = document.getElementById("updateDoc");
  updateDoc.addEventListener("click", async () => {
    console.log("id: ", documentIdToUpdate);

    try {
      let updatedDocument = {
        id: documentIdToUpdate,
        documentContent: contentToUpdate,
      };

      const response = await fetch(`${publishedBaseUrl}documents/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedDocument),
      });

      await response.json();

      if (response.status === 200) {
        greeting.innerText = "Document was updated";
      } else {
        greeting.innerText = "Something went wrong :(";
      }
    } catch (err) {
      greeting.innerText = err;
    }
    editorMode.innerText = "Document was succesfully updated!";
    //initDocumentEditor();
  });
};

const createDocument = () => {
  let userId = localStorage.getItem("userid");
  saveDoc.addEventListener("click", async () => {
    let docName = prompt("What would you like to name your document?"); //lazy dev :)
    const boxContent = document.getElementById("textbox").value;
    try {
      let newDocument = {
        name: docName,
        content: boxContent,
        userId: userId,
      };

      const response = await fetch(`${publishedBaseUrl}documents/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDocument),
      });

      await response.json();

      if (response.status === 201) {
        greeting.innerText = "Document was created";
      } else {
        greeting.innerText = "Something went wrong :(";
      }
    } catch (err) {
      greeting.innerText = err;
    }
    initDocumentEditor();
  });
};
