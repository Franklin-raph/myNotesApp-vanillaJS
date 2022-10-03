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
    let bookArray = JSON.parse(localStorage.getItem('book')) || [];
    if(title.value === "" || Notes.value === ""){
        error.textContent = "Please fill in all fields"
    }  else {
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        let noteDetails = {
            title: title.value,
            body: Notes.value,
            id: Date.now(),
            date: new Date().toLocaleDateString("en-US", options)
        }
        bookArray.push(noteDetails)
        localStorage.setItem("book", JSON.stringify(bookArray))

        window.location.assign('/')
    }
    if(title.value && Notes.value === ""){
        error.textContent = "fill in the notes"
    } 
    if (title.value === "" && Notes.value ){
        error.textContent = "fill in the title"
    }
}

function getNote(){
    let bookArray = JSON.parse(localStorage.getItem('book'));
    if(!bookArray || bookArray.length === 0){
        pageHeader.style.display = 'none'
        nonotesContainer.style.display = 'block'
        nonotes.style.display = 'block'
        return
    }else{
        pageHeader.style.display = 'flex'
        nonotes.style.display = 'none'
        nonotesContainer.style.display = 'none'
    }
    bookArray.reverse().forEach((book) => {
        const notes = document.createElement('div')
        notes.classList.add('notes')
        notes.innerHTML += `

            <div class="titleAndBtn">
                <h2>Title: ${book.title}</h2>
                <v class="showNote" onclick="toggleNote()"> V </p>
            </div>
            <p class="noteBody"> <span class="noteText">Note</span>: ${book.body}</p>
            <div class="dateAndDel">
                <i>created on: ${book.date}</i>
                <div>
                    <i class="ri-pencil-fill" onclick="editNote(${book.id})"></i>
                    <i class="ri-delete-bin-2-fill" onclick="deleteNote(${book.id})"></i>
                </div>
            </div>
        `
        Getnotes.appendChild(notes)
    })
}

function editNote(id){
    // id.preventDefault()
    location.assign(`./editnote.html#${id}`);
    console.log(id)
    // let bookArray = JSON.parse(localStorage.getItem('book'));
    // let index = bookArray.findIndex(book => book.id === id);
    // console.log(index)
}

getNote()

function toggleNote(){
    Array.from(Getnotes.children).forEach((item) => {
        console.log(item.innerHTML)
    })
}

function deleteNote(id){
    let bookArray = JSON.parse(localStorage.getItem('book'));
    let index = bookArray.findIndex(book => book.id === id);
    bookArray.splice(index, 1);
    localStorage.setItem('book', JSON.stringify(bookArray));
    location.reload()
}

// https://fullstackheroes.com/tutorials/javascript/local-storage/




function filterBooks(){
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