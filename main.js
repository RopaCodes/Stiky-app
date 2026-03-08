const toggle_btn = document.getElementById('toggle_btn')
const toggle_bar = document.getElementById('toggle_bar')
const notesContainer = document.getElementById("app")
//const stickyContainer = document.getElementById("sticky_titlebar")

// Add a click event listener to the icon
toggle_btn.addEventListener('click', () => {
    // Toggle the 'show' class on the div
    toggle_bar.classList.toggle('hidden');
})

getNotes().forEach(note => {
    const noteElement = createNoteElements(note.id, note.content)
    notesContainer.appendChild(noteElement)
    
})

toggle_btn.addEventListener("click", () => addNote())

function getNotes(){
    // retreive existing notes from storage, calling local storage api
    return JSON.parse(localStorage.getItem("stickynotes-notes")||"[]")
}
function saveNotes(notes){
    //save local notes from browser to local storage
    // takes in JS notes and stringifys it as a json b4 saving to local storage key
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes))
}
function createNoteElements(id, content){
    //allows us to create a new text area and title element
    //const element_title = document.createElement()

    // create container for the sticky note
    const stickyContainer = document.createElement("div")

    const element = document.createElement("textarea")
    element.classList.add("note")
    element.value = content;
    element.placeholder = "Type your notes here"
    // update the note contents in local storage
    element.addEventListener("change",()=>{
        updateNote(id, element.value)
    })
    element.addEventListener("dblclick", ()=>{
        const doDelete = confirm("Are you sure you wish to delete this Sticky note?")
        if (doDelete){
            deleteNote(id, element)
        }
    })

    const noteTitle = document.createElement("input")
    noteTitle.classList.add("note_title_head")
    noteTitle.placeholder = "Title:"

    stickyContainer.appendChild(noteTitle)
    stickyContainer.appendChild(element)

    return stickyContainer
}
function addNote(){
    // add note to html and local storage
    const notes = getNotes()
    const noteObj = {
        id: Math.floor(Math.random()*100000),
        content: ""
    }
    const noteElement = createNoteElements(noteObj.id, noteObj.content)
    notesContainer.appendChild(noteElement)
    notes.push(noteObj)
    saveNotes(notes)
    
    // stickyContainer.appendChild(noteTitle)
    // const noteElement = createNoteElement(noteObj.id, noteObj.content)
    // stickyContainer.appendChild(noteElement)




}
function updateNote(id, newContent){
    const notes = getNotes()
    const note = notes.find(n=>n.id === id)
    if (note){ //check required incase finding doesnt find anything
        note.content = newContent
        saveNotes(notes)
    }
    
}
function deleteNote(id, element){
    const notes = getNotes().filter(n => n.id !== id);
    saveNotes(notes);
    notesContainer.removeChild(element)
}
