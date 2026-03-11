const notesList = document.getElementById("notesList");
const titleInput = document.getElementById("titleInput");
const contentInput = document.getElementById("contentInput");
const previewOutput = document.getElementById("previewOutput");
const newNoteBtn = document.getElementById("newNoteBtn");
const deleteNoteBtn = document.getElementById("deleteNoteBtn");

let notes = JSON.parse(localStorage.getItem("markdown-notes")) || [];
let activeNoteId = null;

function saveNotes() {
    localStorage.setItem("markdown-notes", JSON.stringify(notes));
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleString();
}

function createNote() {
    const newNote = {
        id: Date.now(),
        title: "Untitled Note",
        content: "# New Note\n\nStart typing here...",
        updatedAt: new Date().toISOString()
    };

    notes.unshift(newNote);
    activeNoteId = newNote.id;
    saveNotes();
    renderNotes();
    loadActiveNote();
}

function deleteNote() {
    if (activeNoteId === null) return;

    notes = notes.filter(note => note.id !== activeNoteId);
    activeNoteId = notes.length ? notes[0].id : null;

    saveNotes();
    renderNotes();
    loadActiveNote();
}

function setActiveNote(id) {
    activeNoteId = id;
    renderNotes();
    loadActiveNote();
}

function loadActiveNote() {
    const activeNote = notes.find(note => note.id === activeNoteId);

    if (!activeNote) {
        titleInput.value = "";
        contentInput.value = "";
        previewOutput.innerHTML = '<p class="empty-state">Create a note to get started.</p>';
        return;
    }

    titleInput.value = activeNote.title;
    contentInput.value = activeNote.content;
    renderPreview(activeNote.content);
}

function updateActiveNote() {
    const activeNote = notes.find(note => note.id === activeNoteId);
    if (!activeNote) return;

    activeNote.title = titleInput.value.trim() || "Untitled Note";
    activeNote.content = contentInput.value;
    activeNote.updatedAt = new Date().toISOString();

    saveNotes();
    renderNotes();
    renderPreview(activeNote.content);
}

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function simpleMarkdown(markdown) {
    let html = escapeHtml(markdown);

    html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
    html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
    html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");
    html = html.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/gim, "<em>$1</em>");
    html = html.replace(/`(.*?)`/gim, "<code>$1</code>");
    html = html.replace(/^\- (.*$)/gim, "<li>$1</li>");
    html = html.replace(/(<li>.*<\/li>)/gis, "<ul>$1</ul>");
    html = html.replace(/\n$/gim, "<br />");
    html = html.replace(/\n\n/g, "<br /><br />");

    return html;
}

function renderPreview(markdown) {
    previewOutput.innerHTML =
        simpleMarkdown(markdown) ||
        '<p class="empty-state">Live preview will appear here.</p>';
}

function renderNotes() {
    notesList.innerHTML = "";

    if (!notes.length) {
        notesList.innerHTML = '<p class="empty-state">No notes yet.</p>';
        return;
    }

    notes.forEach(note => {
        const item = document.createElement("div");
        item.className = "note-item";

        if (note.id === activeNoteId) {
            item.classList.add("active");
        }

        item.innerHTML = `
            <div class="note-title">${note.title}</div>
            <div class="note-date">${formatDate(note.updatedAt)}</div>
        `;

        item.addEventListener("click", () => setActiveNote(note.id));
        notesList.appendChild(item);
    });
}

titleInput.addEventListener("input", updateActiveNote);
contentInput.addEventListener("input", updateActiveNote);
newNoteBtn.addEventListener("click", createNote);
deleteNoteBtn.addEventListener("click", deleteNote);

if (notes.length) {
    activeNoteId = notes[0].id;
    renderNotes();
    loadActiveNote();
} else {
    createNote();
}