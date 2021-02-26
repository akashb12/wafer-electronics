const config = require("../config/key");
const { Shrink } = require("../model/Shrink");

module.exports.createShortUrls = async function (req, res) {
    Shrink.findOne({ fullUrl: req.body.fullUrl })
        .exec(async (err, urls) => {
            if (err) return res.status(400).send(err);
            else if (!urls) {
                const ShortUrl = await Shrink.create({ fullUrl: req.body.fullUrl })
                if (ShortUrl) {
                    return res.status(200).json({
                        status: true,
                        message: "url added"
                    });
                } else {
                    return res.status(400).json({
                        status: false,
                    });
                }
            } else {
                res.status(200).send({
                    status: false,
                    error: "url already exist"
                })
            }
        })
}
// display all urls
module.exports.displayShortUrls = async function (req, res) {
    Shrink.find()
        .exec(async (err, urls) => {
            if (err) return res.status(400).send(err);
            else if (!urls) {
                res.status(400).send({
                    status: false
                })
            } else {
                res.status(200).send({
                    status: true,
                    urls
                })
            }
        })
}

// DISPLAY URLS FOR GRAPH
module.exports.displayGraphUrls = async function (req, res) {
    Shrink.find({enabled:true})
        .exec(async (err, urls) => {
            if (err) return res.status(400).send(err);
            else if (!urls) {
                res.status(400).send({
                    status: false
                })
            } else {
                res.status(200).send({
                    status: true,
                    urls
                })
            }
        })
}

//  get url by shortid
module.exports.displayUrlById = async function (req, res) {
    Shrink.findOne({ shortUrl: req.params.id })
        .exec(async (err, url) => {
            if (err) return res.status(400).send(err);
            else if (!url) {
                res.status(400).send({
                    status: false
                })
            } else {
                res.status(200).send({
                    status: true,
                    url
                })
            }
        })
}

// add clicks to url
module.exports.clickToShortUrl = async function (req, res) {
    Shrink.findOneAndUpdate(
        { shortUrl: req.params.id },
        { $addToSet: { "clicks": { clickedAt: new Date() } } },
        { new: true },
        (err, url) => {
            if (err) return res.json({ status: false, err });
            else if (!url) {
                return res.status(400).json({ status: false });
            }
            else {
                return res.status(200).json({ status: true, url: url.fullUrl });
            }
        }
    );
}

// enable disable url
module.exports.urlVisibility = async function (req, res) {
    Shrink.findOneAndUpdate(
        { shortUrl: req.body.shortUrl, enabled: true },
        { "enabled": false },
        { new: true },
        (err, disabled) => {
            if (err) return res.json({ status: false, err });
            else if (!disabled) {
                Shrink.findOneAndUpdate(
                    { shortUrl: req.body.shortUrl, enabled: false },
                    { "enabled": true },
                    { new: true },
                    (err, enabled) => {
                        if (err) return res.json({ status: false, err });
                        else if (!enabled) {
                            return res.status(400).json({ status: false });
                        }
                        else {
                            return res.status(200).json({ status: true, message: "Url Enabled" });
                        }
                    }
                );
            }
            else {
                return res.status(200).json({ status: true, message: "Url Disabled" });
            }
        }
    );
}

//  get users based on date
module.exports.getUrlsOnDate = async function (req, res) {
    let oneDay = []
    let threeDays = []
    let sevenDays = []
    let thirtyDays = []
    Shrink.findOne(
        { shortUrl: req.params.id },
        async (err, url) => {
            if (err) return res.json({ status: false, err });
            else if (!url) {
                return res.status(400).json({ status: false });
            }
            else {
                const oneDayRun = async (url) => {
                    await url.clicks.map((item) => {
                        if (item.clickedAt >= new Date(Date.now() - 24 * 60 * 60 * 1000)) {
                            oneDay.push(item);
                        }
                    })
                }
                const threeDayRun = async (url) => {
                    await url.clicks.map((item) => {
                        if (item.clickedAt >= new Date(Date.now() - 24 * 60 * 60 * 1000 * 3)) {
                            threeDays.push(item);
                        }
                    })
                }
                const sevenDayRun = async (url) => {
                    await url.clicks.map((item) => {
                        if (item.clickedAt >= new Date(Date.now() - 24 * 60 * 60 * 1000 * 7)) {
                            sevenDays.push(item);
                        }
                    })
                }
                const thirtyDayRun = async (url) => {
                    await url.clicks.map((item) => {
                        if (item.clickedAt >= new Date(Date.now() - 24 * 60 * 60 * 1000 * 30)) {
                            thirtyDays.push(item);
                        }
                    })
                }
                await oneDayRun(url)
                await threeDayRun(url)
                await sevenDayRun(url)
                await thirtyDayRun(url)

                return res.status(200).json({ status: true, oneDay, threeDays, sevenDays, thirtyDays });
            }
        }
    );
}
