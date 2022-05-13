const express = require("express");
const router = express.Router();
const User = require("./db/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authenticateToken = async(req, res, next) => {
    try {
        const token = req.headers.authorization;
        const payload = await jwt.verify(token, process.env.JWT);
        let user = {}
        if(payload) {
            user = await User.findOne({ where: { id: payload.id }});
        }
        req.user = user;
        next();
    } catch(err) {
        next(err);
    }
}

router.get("/", authenticateToken, async(req, res) => {
    if(req.user) {
        res.send(req.user);
    } else {
        res.sendStatus(404);
    }
})

router.post("/login", async (req, res, next) => {
  console.log("req.body = ", req.body);
  const { email, password } = req.body;
  let accessToken;
  //authentication
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    //compared entered password with user's stored password
    let match;
    if (user) {
      match = await bcrypt.compare(password, user.password);
    }
    //if it's a match then generate access token\
   if(match) {
       accessToken = await jwt.sign({id: user.id}, process.env.JWT);
       res.send({userId: user.id, email: user.email, token: accessToken});
   } else {
       res.status(401).send("Unauthorizard Access.")
   }
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  const { firstname, lastname, email } = req.body;
  let { password } = req.body;
  password = await bcrypt.hash(password, 3);

  try {
    const user = await User.create({ firstName: firstname, lastName: lastname, email, password });
    //create a token for signed in user
    let accessToken = await jwt.sign({id: user.id}, process.env.JWT);
    req.user = user;
    res.send({userId: user.id, email: user.email, token: accessToken});
  } catch (err) {
    next(err);
  }
});
module.exports = router;
