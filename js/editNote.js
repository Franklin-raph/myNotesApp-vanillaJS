const editnotes = document.querySelector('#editnotes')
const editnoteTitle = document.querySelector('#editnoteTitle')
let notes = JSON.parse(localStorage.getItem('book'));
const noteId = location.hash.substr(1);
let note = notes.find((note) => note.id.toString() === noteId);

if(!note){
    location.assign('/')
}

editnoteTitle.value = note.title
editnotes.value = note.body

function updateNote(){
    note.title = editnoteTitle.value
    note.body = editnotes.value
    localStorage.setItem("book", JSON.stringify(notes))
    location.assign('/')
}
