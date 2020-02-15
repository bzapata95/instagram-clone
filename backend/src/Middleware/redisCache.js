module.exports = (req, res, next) => {
  const { userId } = req;

  req.redis.get(userId, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      res.send(data);
    } else {
      next();
    }
  });
};
