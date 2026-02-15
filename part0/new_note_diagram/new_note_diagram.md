sequenceDiagram
    participant user
    participant browser
    participant server

    Note right of user: The browser is assumed to have already loaded the page and rendered

    user->>browser: fills the form with "this is awesome"
    user->>browser: clicks the Save button

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/newnote [{note: "this is awesome"}]
    activate server
    server-->>browser: Status 302 Location: /exampleapp/notes

    Note left of browser: browser interprets 302 and looks at the location header

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
    Note right of user: User can now see their comment