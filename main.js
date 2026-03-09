const toggle_btn = document.getElementById('toggle_btn')
//const toggle_bar = document.getElementById('toggle_bar')

const notes_container = document.getElementById("notes_container")
let notes = JSON.parse(localStorage.getItem("stickyNotes")) || []

//save to local storage
function saveNotes(){
    // turns all the notes into a string to be stored on your local device
    localStorage.setItem("stickyNotes",JSON.stringify(notes))
}

//create dynamic notes
function createNote({id,title,content,color}){
    const noteE1 = document.createElement("div")
    noteE1.className = "sticky_area"
    noteE1.dataset.id = id
    noteE1.dataset.color = color ?? 0 //default to 1st colour at pos 0
    
    //create title field
    const titleField = document.createElement("input")
    titleField.className = "note_title"
    titleField.placeholder = "Title:"
    titleField.value = title

    //create delete btn
    const deleteBtn = document.createElement("button")
    deleteBtn.className = "delete"
    deleteBtn.innerText = "x"

    //create textarea
    const textarea = document.createElement("textarea")
    textarea.className = "note"
    textarea.value = content

    //appendChild
    noteE1.appendChild(titleField)
    noteE1.appendChild(deleteBtn)
    noteE1.appendChild(textarea)
    notes_container.appendChild(noteE1)

    //close note listener
    deleteBtn.addEventListener("click", ()=>{
        noteE1.remove();
        notes = notes.filter((n) => String(n.id) !== String(id) )
        saveNotes()
    })

    //update note
    textarea.addEventListener("input", ()=>{
        const idx = notes.findIndex((n) => String(n.id) === String(id)) //get id of the note uve typed in
        notes[idx].content = textarea.value
        saveNotes()
    })

    //update title
    titleField.addEventListener("input", ()=>{
        const idx = notes.findIndex((n) => String(n.id) === String(id)) //get id of the note uve typed in
        notes[idx].title = titleField.value
        saveNotes()
    })
}

// Add a click event listener to the icon
toggle_btn.addEventListener('click', () => {
    // Toggle the 'show' class on the div
    //toggle_bar.classList.toggle('hidden');

    const newNote = {
        id: String(Date.now()),
        title: "",
        content: "",
        color: notes.length % 5 
    }
    notes.push(newNote)
    saveNotes()
    createNote(newNote)

})
//load saved notes
notes.forEach((note) => createNote(note))
// Run this ONCE in the console, then remove it
// localStorage.clear()
