const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
const authRoutes = require("./routes/authRoutes");
const billingRoutes = require("./routes/billingRoutes");

require("./models/User");
require("./models/Survey");
require("./services/passport");

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

//middlewares
app.use(bodyParser.json());
app.use(
  cookieSession({
    //30 days
    maxAge: 30 * 24 * 60 * 60 * 1000,
    //cookie key
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

/*middleware end*/

authRoutes(app);
billingRoutes(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server started on port : " + PORT);
});
