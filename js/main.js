const title = document.getElementById("noteTitle") 
const Notes = document.getElementById("notes") 
const error =  document.getElementById("errorParagraph")
const Getnotes = document.querySelector('.Getnotes')
const pageHeader = document.querySelector('.pageHeader')
const nonotes = document.querySelector('.nonotes')
const nonotesContainer = document.querySelector('.nonotesContainer')
const query = document.querySelector('.query')
const total = document.querySelector('.total')


document.addEventListener('DOMContentLoaded', () => {
    const notes = document.querySelectorAll('.notes')
    notes.forEach(note => {
        // console.log(note.children[1].children[1].children[2])
        let noteBody = note.children[0].children[0].children[1].nextElementSibling
        note.children[0].children[0].children[1].addEventListener('click', () => {
            noteBody.classList.toggle('hide')
        })

        let deleteBtn = note.children[1].children[1].children[2].previousElementSibling
        let editBtn = note.children[1].children[1].children[2].previousElementSibling.previousElementSibling
        console.log(editBtn)
        note.children[1].children[1].children[2].addEventListener("click", ()=>{
            deleteBtn.classList.toggle('hideIcons')
            editBtn.classList.toggle('hideIcons')
        })
    })
})


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
        total.textContent = `(${noteArray.length})`
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
                    <h3>Title: ${note.title}</h3>
                    <i class="ri-arrow-down-s-line" onclick="toggleNote(${note.id})"></i>
                    <p class="noteBody"> <span class="noteText">Note</span>: ${note.body}</p>
                </div>
            </div>
            <div class="dateAndDel">
                <i>created on: ${note.date}</i>
                <div class="options">
                    <i class="ri-pencil-fill" onclick="editNote(${note.id})"></i>
                    <i class="ri-delete-bin-2-fill" onclick="deleteNote(${note.id})"></i>
                    <i class="ri-more-2-fill"></i>
                </div>
            </div>
        `
        Getnotes.appendChild(notes)
    })
}

function openOptions(){
    document.querySelector('.ri-delete-bin-2-fill').style.color = 'green'
}

{/* <p class="noteBody"> <span class="noteText">Note</span>: ${note.body}</p> */}
{/* <i class="ri-pencil-fill" onclick="editNote(${note.id})"></i> */}

function editNote(id){
    location.assign(`./editnote.html#${id}`);
}

getNote()

function toggleNote(){

}

Getnotes.addEventListener('click', function(e){
    if(e.target.classList.contains('ri-pencil-fill')){
        let note = e.target
        console.log(note)
        // Getnotes.childNodes
    }
})

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
        item.classList.add('hideNotes')
    })

    Array.from(Getnotes.children).filter((item) => {
        return item.textContent.toLowerCase().includes(searchInput)
    }).forEach((item) => {
        item.classList.remove('hideNotes')
    })
}

const navOverlay = document.querySelector('.navOverlay')

function openNav(){
    navOverlay.style.visibility = 'visible'
}

function closeNav(){
    navOverlay.style.visibility = 'hidden'
}

// NEWS
// 22da4f44923c423ab03de6ce914486f5