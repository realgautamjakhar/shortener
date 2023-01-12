var { nanoid } = require("nanoid");
/// User nanoid@^3.0.0 version of nanoid to get rid of the error
const express = require("express");
const router = express.Router();
const Url = require("../model/url");

router.post("/", async (req, res) => {
  try {
    const { longUrl } = req.body;

    // If no long url present in req
    if (!longUrl) {
      return res.status(401).json({
        success: false,
        message: "No long url",
      });
    }
    const shortId = nanoid(4);
    const newUrl = await Url.create({
      longUrl,
      shortUrl: `http://localhost:1338/url/${shortId}`,
    });
    res.status(200).json({
      success: true,
      message: "Short Url Created SuccessFully",
      shortUrl: newUrl.shortUrl,
    });
    console.log(longUrl);
  } catch (error) {
    console.log("error is", error);
  }
});

router.get("/:shortId", async (req, res) => {
  try {
    //Getting the shortId from the params
    const shortId = req.params.shortId;

    const allUrl = await Url.findAll();
    console.log(allUrl);
    //Searching the database for the longUrl
    const dbUrl = await Url.findOne({
      where: {
        shortUrl: `http://localhost:1338/url/${shortId}`,
      },
    });

    console.log(dbUrl.shortUrl);
    //If no longUrl in database send 404 With a message

    if (!dbUrl) {
      return res.status(404).json({
        success: false,
        message: "No longUrl found in database",
      });
    }

    //If everything goes as plan

    return res.redirect(dbUrl.longUrl); // redirect the user to the long url
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
