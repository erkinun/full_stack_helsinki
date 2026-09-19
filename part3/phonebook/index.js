require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Phonebook = require("./models/phonebook");

const app = express();
morgan.token("body", function (req, res) {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});
app.use(morgan(":method :url :status :response-time ms :body"));

app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

let phonebookData = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
  {
    id: "5",
    name: "Barry Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (request, response) => {
  response.send(
    `Phonebook has info for ${phonebookData.length} people <br/> ${new Date(Date.now())}`,
  );
});

app.get("/api/persons", (request, response) => {
  Phonebook.find({}).then((people) => {
    response.json(
      people.map((person) => ({
        name: person.name,
        number: person.phoneNumber ?? person.number,
      })),
    );
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;

  Phonebook.findById(request.params.id).then((person) => {
    response.json({
      ...person,
      number: person.phoneNumber,
    });
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  phonebookData = phonebookData.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  // if (phonebookData.find((p) => p.name === body.name)) {
  //   return response.status(400).json({
  //     error: `${body.name} already in phonebook`,
  //   });
  // }

  const phonebookEntry = new Phonebook({
    name: body.name,
    phoneNumber: body.number,
  });

  phonebookEntry.save().then((savedEntry) => {
    response.json(savedEntry);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
