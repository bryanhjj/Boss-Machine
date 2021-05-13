const ideasRouter = require('express').Router();
module.exports = ideasRouter;
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

// in accordance to the order from the instructions in README
const {
    getAllFromDatabase,
    addToDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');

// GET /api/ideas to get an array of all ideas
ideasRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('ideas'));
});

// POST /api/ideas to create a new idea and save it to the database
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

// GET /api/ideas/:ideaId to get a single idea by id
ideasRouter.param('id', (req, res, next, id) => {
    const targetIdea = getFromDatabaseById('ideas', id);
    if (targetIdea) {
        req.idea = targetIdea;
        next();
    } else {
        res.status(404).send("Idea not found.");
    }
});

ideasRouter.get('/:id', (req, res, next) => {
    res.send(req.idea);
  });

// PUT /api/ideas/:ideaId to update a single idea by id
ideasRouter.put('/:id', checkMillionDollarIdea, (req, res, next) => {
    let updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
});

// DELETE /api/ideas/:ideaId to delete a single idea by id
ideasRouter.delete('/:id', (req, res, next) => {
    let ideaToBeDeleted = deleteFromDatabasebyId('ideas', req.params.id);
    if (ideaToBeDeleted) {
        res.status(204).send();
    } else {
        res.status(404).send('An error has occurred, kindly contact our support staff for assistance.');
    }
});