const mongoose = require('mongoose');

const Worktime = mongoose.model('worktimes');

module.exports = (app) => {
  app.post('/api/worktimes', async (req, res) => {
    const { date, project, start, end, pause, comment } = req.body;

    const worktime = await new Worktime({
      date,
      project,
      start,
      end,
      pause,
      comment
    }).save();

    res.send(worktime);
  });

  app.get('/api/worktimes', async (req, res) => {
    const worktimeList = await Worktime.find({});

    res.send(worktimeList);
  });

  app.put('/api/worktimes', async (req, res) => {
    const { _id, date, project, start, end, pause, comment } = req.body;

    const worktime = await Worktime.findOneAndUpdate(
      {
        _id
      },
      {
        date,
        project,
        start,
        end,
        pause,
        comment
      },
      { new: true }
    );

    res.send(worktime);
  });

  app.delete('/api/worktimes/:id', async (req, res) => {
    const _id = req.params.id;

    await Worktime.deleteOne({ _id });

    res.send(_id);
  });
};
