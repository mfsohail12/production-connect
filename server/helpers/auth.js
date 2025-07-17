const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

const comparePassword = async (password, hashed) => {
  return await bcrypt.compare(password, hashed);
};

const toNameCase = (name) => {
  const nameArr = name.toLowerCase().split("");
  nameArr[0] = nameArr[0].toUpperCase();
  return nameArr.join("");
};

const getToken = (req) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  return token;
};

module.exports = {
  hashPassword,
  comparePassword,
  toNameCase,
  getToken,
};
