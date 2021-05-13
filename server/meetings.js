const meetingsRouter = require('express').Router();
module.exports = meetingsRouter;


// same order as per instructions in README
const {
    getAllFromDatabase,
    addToDatabase,
    deleteAllFromDatabase,
    createMeeting,
} = require('./db');

// GET /api/meetings to get an array of all meetings
meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'));
});

// POST /api/meetings to create a new meeting and save it to the database
meetingsRouter.post('/', (req, res, next) => {
    let newMeeting = addToDatabase('meetings', createMeeting());
    if (newMeeting) {
        res.status(201).send(newMeeting);
    } else {
        res.status(400).send('An error has occurred, kindly contact our support staff for assistance.');
    }
});

// DELETE /api/meetings to delete _all_ meetings from the database
meetingsRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send();
});