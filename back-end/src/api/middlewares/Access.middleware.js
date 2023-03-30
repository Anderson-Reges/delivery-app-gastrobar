const md5 = require('md5');
const { User } = require('../../database/models');

const evaluateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const pass = md5(password);
  const user = await User.findOne({
    where: { email },
  });
  if (!user || pass !== user.password) return res.status(404).json({ message: 'Not found' });
  next();
};

module.exports = {
  evaluateLogin,
};