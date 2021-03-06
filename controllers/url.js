//*** import third party packages
const shortid = require("shortid");
const validUrl = require("valid-url");
const { validationResult } = require("express-validator");

//** import models
const Url = require("../models/url");

//** constants

const BASE_URL = "https://www.onlineshort.me/";

exports.postShortURL = (req, res, next) => {
  const longUrl = req.body.longUrl;
  const shortUrl = shortid.generate();
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("./index", {
      outputShortUrl: true,
      colorCode: "danger",
      shortUrl: errors.array()[0].msg,
    });
  }
  const url = new Url({
    longUrl: longUrl,
    shortUrl: shortUrl,
  });
  url
    .save()
    .then(shortenUrlDoc => {
      if (shortenUrlDoc) {
        res.render("./index", {
          outputShortUrl: true,
          colorCode: "primary",
          shortUrl: "onlineshort.me/" + shortenUrlDoc.shortUrl,
        });
      }
    })
    .catch(err => {
      const error = new Error("short url registration faild!");
      error.code = 500;
      next(error);
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
      const error = new Error("long url redirect faild!");
      error.code = 500;
      next(error);
    });
};

exports.getIndex = (req, res, next) => {
  res.render("./index", {
    outputShortUrl: false,
  });
};
