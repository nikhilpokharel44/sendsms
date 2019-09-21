const express = require("express");
const Nexmo = require("nexmo");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;

//set a static folder
app.use("/static", express.static(path.join(__dirname, "static")));
//use bodyparse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//setting view-engine
app.set("view-engine", "ejs");

//implement nexmo
const nexmo = new Nexmo(
  {
    apiKey: "<your apiKey>",
    apiSecret: "<your api secret>"
  },
  { debug: true }
);
//rendering content
app.get("/", (req, res) => {
  res.render("index.ejs", { messageSend: "" });
});
//getting post requesty
app.post("/send", (req, res) => {
  const phoneNumber = req.body.number;
  const message = req.ybody.msg;

  nexmo.message.sendSms(
    "<your special number provided>",
    phoneNumber,
    message,
    { type: "unicode" },
    (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        console.dir(responseData);
        res.render("index.ejs", {
          messageSend: "your message has been send successfully!!!"
        });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`server running at port${PORT}`);
});
