const title = document.getElementById("noteTitle") 
const Notes = document.getElementById("notes") 
const error =  document.getElementById("errorParagraph")
const navOverlay = document.querySelector('.navOverlay')

function createNote(){
    let noteArray = JSON.parse(localStorage.getItem('note')) || [];
    if(title.value === "" || Notes.value === ""){
        error.innerHTML = `<p class="errorMsg">Please fill in all fields</p>`
    }  else {
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let noteDetails = {
            title: title.value,
            body: Notes.value,
            id: Date.now(),
            date: new Date().toLocaleDateString("en-US", options)
        }
        noteArray.push(noteDetails)
        localStorage.setItem("note", JSON.stringify(noteArray))

        window.location.assign('/')
    }
    if(title.value && Notes.value === ""){
        error.innerHTML = `<p class="errorMsg">Please fill in the note field</p>`
    } 
    if (title.value === "" && Notes.value ){
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