import tinymce from "tinymce";
import { Document } from "./models/interfaces";
let publishedBaseUrl = "http://localhost:3000/";
const editorMode = document.getElementById("editorMode") as HTMLHeadingElement;

export const initDocumentEditor = () => {
  const documentContainer = document.getElementById("documentContainer") as HTMLDivElement;
  documentContainer.innerHTML = /*html*/ `
        <textarea id="textbox" name="textbox" rows="29" cols="60"></textarea>
        <div id="editorBtns">
          <button id="saveDoc" class="submit">Save as a new document</button>
          <button id="undoDoc" class="submit">Undo</button>
        </div>
        <h2 id="savedDocH2"class="centeredH2">Your saved documents:</h2>
        <div id="storedDoc" ></div>
    `;

  //editorMode.innerText = "Create Document";
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
  const undoDocBtn = document.getElementById("undoDoc") as HTMLButtonElement;
  const saveDocBtn = document.getElementById("saveDoc") as HTMLButtonElement;

  undoDocBtn.addEventListener("click", function () {
    let textboxEditor = tinymce.get("textbox");
    if (textboxEditor != null) {
      textboxEditor.setContent("");
    }

    saveDocBtn.innerText = "Save as a new document";
    editorMode.innerText = "Create Document";
    const updateDocBtn: HTMLElement | null = document.getElementById("updateDoc");
    if (updateDocBtn) {
      updateDocBtn.remove();
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

const printDocuments = (documents: Document[]) => {
  let totDocuments = document.getElementById("savedDocH2") as HTMLHeadingElement;
  totDocuments.innerHTML = `Your saved documents: (${documents.length} in total)`;
  const storedDocuments = document.getElementById("storedDoc") as HTMLDivElement;
  storedDocuments.innerHTML = documents
    .map((document) => {
      return /*html*/ `
        <div id="document-${document.documentName}">
            
            <div class="headerContainer">
                <h3>${document.documentName}<h3>
                <p>Created in: ${document.createDate.substring(0, 10)}<p>
            </div>

            <div id=${document.id} class="contentContainer">
            ${document.documentContent}
            </div>

            <div class="btnContainer">
                <button id="${document.documentName}-editBtn" data-document-id="${
        document.id
      }">Edit</button> 
                <button id="${document.documentName}-deleteBtn" data-document-id="${
        document.id
      }">Delete</button> 
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
      let documentId: string | null = button.getAttribute("data-document-id");
      if (documentId) {
        const documentContent = document.getElementById(documentId)?.innerHTML;
        let parentElement = document.getElementById(documentId)?.parentElement;

        if (parentElement) {
          let parentName = parentElement.id;
          let textboxEditor = tinymce.get("textbox");

          if (textboxEditor != null && documentContent) {
            textboxEditor.setContent(documentContent);
          }

          //scroll to editor
          window.scrollTo(0, (document.querySelector("#textbox") as HTMLElement).offsetTop);

          editorMode.innerText = `You are editing ${parentName}`;
          editorMode.innerText = editorMode.innerText.replace(/-/g, ": ");
          editDocument(documentId, parentName);
        }
      }
    })
  );

  //delete btn
  let addDeleteEvent = document.querySelectorAll('[id$="-deleteBtn"]');
  addDeleteEvent.forEach((button) =>
    button.addEventListener("click", async () => {
      let userId = localStorage.getItem("userid") as string;
      const documentId = button.getAttribute("data-document-id") as string;

      let updateDocument = {
        id: documentId,
        userId: userId,
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
          editorMode.innerText = `you deleted document with id:${documentId} `;
        } else {
          editorMode.innerText = "Something went wrong :(";
        }
      } catch (err) {
        editorMode.innerText = String(err);
      }

      initDocumentEditor();
    })
  );
};

const editDocument = (documentIdToUpdate: string, documentName: string) => {
  const updateDocBtn: HTMLElement | null = document.getElementById("updateDoc");
  if (updateDocBtn) {
    updateDocBtn.remove();
  }

  // innerHTML += will remove eventListeners, therefor solution below
  const editorBtnsDiv = document.getElementById("editorBtns") as HTMLDivElement;

  editorBtnsDiv.insertAdjacentHTML(
    "afterbegin",
    /*html */ `<button id="updateDoc" data-document-id="${documentIdToUpdate}" class="submit">update ${documentName}</button>`
  );
  let updateDoc = document.getElementById("updateDoc") as HTMLElement;
  updateDoc.addEventListener("click", async () => {
    let updatedContent = "";
    let textboxEditor = tinymce.get("textbox");
    if (textboxEditor != null) {
      updatedContent = textboxEditor.getContent();
    }

    try {
      let updatedDocument = {
        id: documentIdToUpdate,
        documentContent: updatedContent,
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
        editorMode.innerText = "Document was succesfully updated!";
      } else {
        editorMode.innerText = "Document was succesfully updated!";
      }
    } catch (err) {
      editorMode.innerText = String(err);
    }
    initDocumentEditor();
  });
};

const createDocument = () => {
  let userId = localStorage.getItem("userid");
  const saveDocBtn = document.getElementById("saveDoc") as HTMLButtonElement;
  saveDocBtn.addEventListener("click", async () => {
    let docName = prompt("What would you like to name your document?"); //lazy dev :)

    let documentContent = "";
    let textboxEditor = tinymce.get("textbox");
    if (textboxEditor != null) {
      documentContent = textboxEditor.getContent();
    }

    try {
      let newDocument = {
        name: docName,
        content: documentContent,
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
        editorMode.innerText = "Document was created";
      } else {
        editorMode.innerText = "Something went wrong :(";
      }
    } catch (err) {
      editorMode.innerText = String(err);
    }
    initDocumentEditor();
  });
};
