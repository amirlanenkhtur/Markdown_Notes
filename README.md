# Markdown Notes App

A simple browser-based note-taking application that supports Markdown-style formatting and provides a live preview while the user types.

This project was built using HTML, CSS, and JavaScript to practice DOM manipulation, event handling, and local storage.

---

## Features

* Create and delete notes

* Live Markdown preview while typing

* Automatic saving using localStorage

* Simple Markdown support:

    * #Heading

    * ##Subheading

    * ###Small heading

    * ** bold text **

    * *italic text *

    * \inline code``

    * -lists

---

## Technologies Used

HTML

CSS

JavaScript

Browser Local Storage

---

## How It Works

The application listens for the input event on the editor textarea.
Whenever the user types, the content is converted from Markdown to HTML using simple regex rules and displayed in the preview panel.

All notes are saved automatically in the browser using localStorage, allowing notes to persist even after refreshing the page.

---
## Project Structure
Markdown-Notes
│
├── index.html
├── styles.css
├── script.js
└── README.md

---
## How to Run the Project

1. Clone the repository (git clone https://github.com/amirlanenkhtur/Markdown-Notes.git)
2. Open the folder
3. Open index.html in a browser

No installation required.
