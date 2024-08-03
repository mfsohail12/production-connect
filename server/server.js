const fs = require("fs");
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:8000"],
};
const bcrypt = require("bcrypt");

app.use(cors(corsOptions));
app.use(express.json());

let data;
try {
  data = JSON.parse(fs.readFileSync("./users.json", "utf-8"));
} catch (error) {
  console.log(error);
}

function createUser(user) {
  const updatedData = [...data, user];
  fs.writeFile("./users.json", JSON.stringify(updatedData, null, 2), (err) => {
    if (err) {
      console.log(err);
    }
  });
  return;
}

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    const { accountType, firstName, lastName, email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = {
      accountType,
      firstName,
      lastName,
      email,
      password: hashedPassword,
    };
    createUser(user);
    res.status(201).send("Account created successfully");
  } catch {
    res.status(500).send();
  }
});

app.post("/users/login", async (req, res) => {
  const user = data.find((user) => user.email === req.body.email);

  if (user == null) {
    return res.status(400).send("Invalid login credentials");
  }

  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send("Login Successsful");
    } else {
      res.send("Invalid login credentials");
    }
  } catch {
    res.status(500).send();
  }
});

app.listen(8080, () => {
  console.log("server started on port 8080");
});
