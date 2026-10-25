const phonebookRouter = require("express").Router();
const Phonebook = require("../models/phonebook");

phonebookRouter.get("/info", (request, response) => {
  Phonebook.find({}).then((people) => {
    response.send(
      `Phonebook has info for ${people.length} people <br/> ${new Date(Date.now())}`,
    );
  });
});

phonebookRouter.get("/", (request, response) => {
  Phonebook.find({}).then((people) => {
    response.json(
      people.map(person => ({
        name: person.name,
        number: person.phoneNumber ?? person.number,
        id: person.id,
      })),
    );
  });
});

phonebookRouter.get("/:id", (request, response) => {
  Phonebook.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json({
          name: person.name,
          number: person.phoneNumber ?? person.number,
          id: person.id,
        });
      }
      else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(400).send({ error: "malformatted id" });
    });
});

phonebookRouter.delete("/:id", (request, response, next) => {
  Phonebook.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch(error => next(error));
});

phonebookRouter.post("/", (request, response, next) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }

  const phonebookEntry = new Phonebook({
    name: body.name,
    phoneNumber: body.number,
  });

  phonebookEntry
    .save()
    .then((savedEntry) => {
      response.json(savedEntry);
    })
    .catch((error) => {
      next(error);
    });
});

phonebookRouter.put("/:id", (request, response, next) => {
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
    .catch(error => next(error));
});

module.exports = phonebookRouter;
