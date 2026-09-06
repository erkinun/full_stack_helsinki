const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://erkinun_db_user:${password}@cluster0.fkyks8c.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });

const phonebookSchema = new mongoose.Schema({
  name: String,
  phoneNumber: Number,
});

const Phonebook = mongoose.model("Phonebook", phonebookSchema);
if (process.argv.length < 5) {
  // list mode
  Phonebook.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((entry) => {
      console.log(`${entry.name ?? ""} ${entry.phoneNumber ?? ""}`);
    });
    mongoose.connection.close();
  });
} else {
  const name = process.argv[3];
  const phoneNumber = process.argv[4];

  const newEntry = new Phonebook({
    name,
    phoneNumber,
  });

  newEntry.save().then((result) => {
    console.log(`Added ${name} number ${phoneNumber} to phonebook`);
    mongoose.connection.close();
  });
}

// const note = new Note({
//   content: "HTML is easy",
//   important: true,
// });

// note.save().then((result) => {
//   console.log("note saved!");
//   mongoose.connection.close();
// });
