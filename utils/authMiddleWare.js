const User = require("../models/user");
async function authMiddleWare(req, res, next) {
  const { user } = req.signedCookies;
  if (!user) return res.redirect("/auth/signin");
  const Signeduser = await User.findOne({ email: user });
  req.user = Signeduser;
  next();
}
module.exports = authMiddleWare;
