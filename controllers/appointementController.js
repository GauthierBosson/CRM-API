const { test, createEvents } = require('../utils/icsGenerator');

exports.testIcs = async (req, res, next) => {
  try {
    const cal = test();
    cal.serve(res);
  } catch (error) {
    next(error)
  }
};

exports.createEvents = async (req, res, next) => {
  try {
    const cal = createEvents(req.body.cal);
    cal.serve(res);
  } catch (error) {
    next(error)
  }
}
