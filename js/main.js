const title = document.getElementById("noteTitle") 
const Notes = document.getElementById("notes") 
const error =  document.getElementById("errorParagraph")
const Getnotes = document.querySelector('.Getnotes')
const pageHeader = document.querySelector('.pageHeader')
const nonotes = document.querySelector('.nonotes')
const nonotesContainer = document.querySelector('.nonotesContainer')
const query = document.querySelector('.query')

// console.log(editnoteTitle.value)


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

function getNote(){
    let noteArray = JSON.parse(localStorage.getItem('note'));
    if(!noteArray || noteArray.length === 0){
        pageHeader.style.display = 'none'
        nonotesContainer.style.display = 'block'
        nonotes.style.display = 'block'
        return
    }else{
        pageHeader.style.display = 'flex'
        nonotes.style.display = 'none'
        nonotesContainer.style.display = 'none'
    }
    noteArray.reverse().forEach((note) => {
        const notes = document.createElement('div')
        notes.classList.add('notes')
        notes.innerHTML += `

            <div>
                <div class="titleAndBtn">
                    <h2>Title: ${note.title}</h2>
                    <i class="ri-pencil-fill" onclick="editNote(${note.id})"></i>
                </div>
                <p class="noteBody"> <span class="noteText">Note</span>: ${note.body}</p>
            </div>
            <div class="dateAndDel">
                <i>created on: ${note.date}</i>
                <i class="ri-delete-bin-2-fill" onclick="deleteNote(${note.id})"></i>
            </div>
        `
        Getnotes.appendChild(notes)
    })
}

function editNote(id){
    location.assign(`./editnote.html#${id}`);
}

getNote()

// function toggleNote(){
//     Array.from(Getnotes.children).forEach((item) => {
//         console.log(item.innerHTML)
//     })
// }

function deleteNote(id){
    let noteArray = JSON.parse(localStorage.getItem('note'));
    let index = noteArray.findIndex(note => note.id === id);
    noteArray.splice(index, 1);
    localStorage.setItem('note', JSON.stringify(noteArray));
    location.reload()
}

// https://fullstackheroes.com/tutorials/javascript/local-storage/




function filterNotes(){
    const searchInput = query.value.trim().toLowerCase()

    Array.from(Getnotes.children).filter((item) => {
        return !item.textContent.toLowerCase().includes(searchInput)
    }).forEach((item) => {
        item.classList.add('hide')
    })

    Array.from(Getnotes.children).filter((item) => {
        return item.textContent.toLowerCase().includes(searchInput)
    }).forEach((item) => {
        item.classList.remove('hide')
    })
}