const minionsRouter = require('express').Router();

module.exports = minionsRouter;

// listing them in the order as per instructions from README to make keeping track of things easier
const {
    getAllFromDatabase,
    addToDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');

// GET /api/minions to get an array of all minions
minionsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('minions'));
});

// POST /api/minions to create a new minion and save it to the database
minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

// GET /api/minions/:minionId to get a single minion by id
minionsRouter.param('minionId', (req, res, next, id) => {
    const targetMinion = getFromDatabaseById('minions', id)
    if (targetMinion) {
        req.minion = targetMinion;
        next();
    } else {
        res.status(404).send('Minion not found.');
    }
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
  });

// PUT /api/minions/:minionId to update a single minion by id
minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion);
});

// DELETE /api/minions/:minionId to delete a single minion by id
minionsRouter.delete('/:minionId', (req, res, next) => {
    const minionToDelete = deleteFromDatabasebyId('minions', req.params.minionId);
    if (minionToDelete) {
        res.status(204).send('Successfully removed minion.');
    } else {
        res.status(500).send('An error has occurred, kindly contact our support staff for assistance.');
    }
});