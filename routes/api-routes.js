const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require ("fs");

router.get('/notes', async (req, res) => {
  const dbJson = await JSON.parse(fs.readFileSync("db/db.json","utf8"));
  res.json(dbJson);
});

router.post('/notes', (req, res) => {
const dbJson = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
const newFeedback =  {
    title: req.body.title,
    text: req.body.text,
    id: uuidv4(),
};
dbJson.push(newFeedback);
fs.writeFileSync("db/db.json", JSON.stringify(dbJson));
res.json(dbJson);
});

router.delete('/notes/:id', (req, res) => {
  let data = fs.readFileSync("db/db.json", "utf8");
  const dataJSON =  JSON.parse(data);
  const newNotes = dataJSON.filter((note) => { 
    return note.id !== req.params.id;
  });
  fs.writeFileSync("db/db.json",JSON.stringify(newNotes));
  res.json("Note deleted.");
});

module.exports = router; 