const ensureAuthenticated = async (req, res, next) => {
  if (req.session.userId) {
    const user = await users.findById(req.session.userId);
    if (user) {
      req.user = user;
      return next();
    }
  }
  res.status(401).json({ error: "Unauthorized" });
};

export default ensureAuthenticated;
