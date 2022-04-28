const path = require("path");
const express = require("express");
const hbs = require("hbs", "");

const app = express();

//define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static directory search
app.use(express.static(publicDirPath));

//setup weather and geo api
const geocode = require("./utils/geocode");
const weather = require("./utils/weather");

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must enter an address.",
    });
  }
  geocode(req.query.address, (error, { location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    weather(location, (error, currentData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        current: currentData,
        location,
      });
    });
  });
});

app.get("", (req, res) => {
  res.render("index", {
    title: "weather",
    name: "travis john dunbar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    name: "travis john dunbar",
    helpText: "This is some MORE helpful text...",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "about",
    name: "travis john dunbar",
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "help article not found",
    name: "travis dunbar",
    errorMsg: "there is no help for you, fool...",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Page not found.",
    name: "Travis Dunbar",
    errorMsg: "Not sure what you are looking for sorry...",
  });
});

app.listen(3000, () => {
  console.log("Server is up on 3000");
});
