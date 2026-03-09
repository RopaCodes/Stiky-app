const toggle_btn = document.getElementById('toggle_btn')
const notes_container = document.getElementById("notes_container")
let notes = JSON.parse(localStorage.getItem("stickyNotes")) || []

// PWA Install — capture the prompt ASAP, before DOM is ready
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault(); // stop the default mini-infobar
  deferredPrompt = e;

  // Now show the install button
  const installBtn = document.getElementById("installBtn");
  if (installBtn) {
    installBtn.style.display = "block";

    installBtn.addEventListener("click", () => {
      deferredPrompt.prompt();

      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted install");
        }
        deferredPrompt = null;
        installBtn.style.display = "none";
      });
    });
  }
});

// Save to local storage
function saveNotes() {
  localStorage.setItem("stickyNotes", JSON.stringify(notes))
}

// Create dynamic notes
function createNote({ id, title, content, color }) {
  const noteE1 = document.createElement("div")
  noteE1.className = "sticky_area"
  noteE1.dataset.id = id
  noteE1.dataset.color = color ?? 0

  const titleField = document.createElement("input")
  titleField.className = "note_title"
  titleField.placeholder = "Title:"
  titleField.value = title

  const deleteBtn = document.createElement("button")
  deleteBtn.className = "delete"
  deleteBtn.innerText = "x"

  const textarea = document.createElement("textarea")
  textarea.className = "note"
  textarea.value = content

  noteE1.appendChild(titleField)
  noteE1.appendChild(deleteBtn)
  noteE1.appendChild(textarea)
  notes_container.appendChild(noteE1)

  deleteBtn.addEventListener("click", () => {
    noteE1.remove();
    notes = notes.filter((n) => String(n.id) !== String(id))
    saveNotes()
  })

  textarea.addEventListener("input", () => {
    const idx = notes.findIndex((n) => String(n.id) === String(id))
    notes[idx].content = textarea.value
    saveNotes()
  })

  titleField.addEventListener("input", () => {
    const idx = notes.findIndex((n) => String(n.id) === String(id))
    notes[idx].title = titleField.value
    saveNotes()
  })
}

// Add new note on click
if (toggle_btn) {
  toggle_btn.addEventListener('click', () => {
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
}

// Load saved notes
notes.forEach((note) => createNote(note))

// Register service worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/serviceWorker.js")
      .then(reg => console.log("Service Worker registered", reg))
      .catch(err => console.log("Service Worker failed", err))
  })
}
