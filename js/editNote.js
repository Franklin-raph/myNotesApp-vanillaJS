const editNoteBody = document.querySelector('#editNoteBody')
const editNoteTitle = document.querySelector('#editNoteTitle')
const error =  document.getElementById("errorParagraph")
let notes = JSON.parse(localStorage.getItem('note'));
const noteId = location.hash.substr(1);
let note = notes.find((note) => note.id.toString() === noteId);
const navOverlay = document.querySelector('.navOverlay')

if(!note){
    location.assign('/')
}

editNoteTitle.value = note.title
editNoteBody.value = note.body

function updateNote(){

    if(editNoteTitle.value === "" || editNoteBody.value === ""){
        error.innerHTML = `<p class="errorMsg">Please fill in all fields</p>`
    }  else {
        note.title = editNoteTitle.value
        note.body = editNoteBody.value
        localStorage.setItem("note", JSON.stringify(notes))
        location.assign('/')
    }

    if(editNoteTitle.value && editNoteBody.value === ""){
        error.innerHTML = `<p class="errorMsg">Please fill in the note field</p>`
    } 
    if (editNoteTitle.value === "" && editNoteBody.value ){
        error.innerHTML = `<p class="errorMsg">Please fill in the title field</p>`
    }

    setTimeout(() => {
        error.innerHTML = ""
    },3500)

    
}


function openNav(){
    navOverlay.style.visibility = 'visible'
}

function closeNav(){
    navOverlay.style.visibility = 'hidden'
}
