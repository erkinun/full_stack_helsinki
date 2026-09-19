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

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler);

app.get("/info", (request, response) => {
  Phonebook.find({}).then((people) => {
    response.send(
      `Phonebook has info for ${people.length} people <br/> ${new Date(Date.now())}`,
    );
  });
});

app.get("/api/persons", (request, response) => {
  Phonebook.find({}).then((people) => {
    response.json(
      people.map((person) => ({
        name: person.name,
        number: person.phoneNumber ?? person.number,
        id: person.id,
      })),
    );
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;

  Phonebook.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json({
          name: person.name,
          number: person.phoneNumber ?? person.number,
          id: person.id,
        });
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(400).send({ error: "malformatted id" });
    });
});

app.delete("/api/persons/:id", (request, response) => {
  Phonebook.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
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

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;

  Phonebook.findById(request.params.id)
    .then((entry) => {
      if (!entry) {
        return response.status(404).end();
      }

      entry.name = name;
      entry.phoneNumber = number;

      return entry.save().then((updatedEntry) => {
        response.json(updatedEntry);
      });
    })
    .catch((error) => next(error));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
