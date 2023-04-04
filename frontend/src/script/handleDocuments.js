export const initDocumentEditor = () => {
    const documentContainer = document.getElementById("documentContainer");
    documentContainer.innerHTML= /*html*/`
        <textarea id="textbox" name="textbox" rows="29" cols="60"></textarea>
        <button id="saveDoc" class="submit">Save Document</button>
        <button id="removeDoc" class="submit">Remove Document</button>
        <div id="preview"></div>
    `
    tinymce.init({
      
        selector: "#textbox",
        toolbar: "styleselect | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
  
        setup: function(editor) {
            editor.on("change", function(){
                editor.save();
            })
        }
      });
      const textbox = document.getElementById("textbox").value;
      fetchDocuments(textbox);
}

const fetchDocuments = (editorValue) => {

    document.getElementById("saveDoc").addEventListener("click", function(){
        let name = prompt("Name of document?"); //lazy dev :)
        console.log(name);
        const testing = document.getElementById("textbox").value;
        console.log(testing);

      })
}