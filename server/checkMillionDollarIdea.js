// a function that checks if an idea is worth at least one million dollars
const checkMillionDollarIdea = (req, res, next) => {
    let {numWeeks, weeklyRevenue} = req.body;
    let totalRev = Number(numWeeks) * Number(weeklyRevenue);
    if (totalRev >= 1000000) {
        next();
    } else {
        res.status(400).send();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;


