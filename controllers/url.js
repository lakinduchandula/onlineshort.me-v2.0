//*** import third party packages
const shortid = require("shortid");
const validUrl = require("valid-url");

//** import models
const Url = require("../models/url");

//** constants

const BASE_URL = "https://www.onlineshort.me/";

exports.postShortURL = (req, res, next) => {
  const longUrl = req.body.longUrl;
  const shortUrl = shortid.generate();
  if (!longUrl) {
    return res.redirect("/");
  }
  const url = new Url({
    longUrl: longUrl,
    shortUrl: shortUrl,
  });
  return url
    .save()
    .then(shortenUrlDoc => {
      res.render("./index", {
        outputShortUrl: true,
        shortUrl: shortenUrlDoc.shortUrl,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getLongUrl = (req, res, next) => {
  const shortCode = req.params.shortCode;
  let longUrl;
  if (!validUrl.isUri(BASE_URL)) {
    const error = new Error("No valid shortUrl Found!!");
    error.code = 404;
    throw error;
  }
  Url.findOne({ shortUrl: shortCode })
    .then(url => {
      if (!url) {
        const error = new Error("No valid shortUrl Found!!");
        error.code = 404;
        throw error;
      }
      longUrl = url.longUrl;
      res.redirect(longUrl);
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getIndex = (req, res, next) => {
  res.render("./index", {
    outputShortUrl: false,
  });
};
