sequenceDiagram
    participant user
    participant browser
    participant server

    Note right of user: The browser is assumed to have already loaded the page and rendered

    user->>browser: fills the form with "this is awesome"
    user->>browser: clicks the Save button

    activate browser
    Note right of browser: form submit function starts running
    Note right of browser: function already saved the note and rendered it
    Note right of browser: form submit function sends note server
    deactivate browser

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa [{"content": "this is new note from spa","date": "2026-02-15T17:32:03.999Z"}]
    Note right of browser: Content-type: application/json 
    activate server
    server-->>browser: Status 201 { message: "note created" }
    deactivate server
