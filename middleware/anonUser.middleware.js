const { v4: uuidv4 } = require("uuid");

module.exports = (req, res, next) => {
  let anonId = req.cookies?.anonId;

  if (!anonId) {
    anonId = uuidv4();

    res.cookie("anonId", anonId, {
      httpOnly: true,
      sameSite: "lax",
      secure: false, // true in production (HTTPS)
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
    });
  }

  req.anonId = anonId;
  next();
};
