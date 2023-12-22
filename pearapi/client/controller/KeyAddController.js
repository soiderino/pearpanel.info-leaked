const KeyModel = require ('../models/LicenseModel');
const VersionModel = require ('../models/VersionModel');
const moment = require("moment/moment");
const crypto = require('crypto');
const PrivateModel = require("../models/PrivateModel");

class KeyApi {
    async KeyGenerator(req, res) {
        try {
            const salt = moment().format('DD.MM.YYYY HH:mm:ss');
            const salted_hwid = req.body.hwid + salt;

            const key = crypto.createHash('sha256').update(salted_hwid).digest('hex');
            const SearchResult = await KeyModel.findOne({hwid: req.body.hwid});
            if (SearchResult)
                return res.status(200).json({message: "Already exists"});
            const DbKey =
                new KeyModel({
                    time: moment().format('DD.MM.YYYY'),
                    hwid: req.body.hwid, pkey: key
                })
            await DbKey.save();
            console.log(key)
            return res.status(200).json({success: true});

        } catch (e) {

        }
    }

    async KeyChecker(req, res) {
        const KeyResult = await KeyModel.findOne({pkey: req.body.pkey});
        if (KeyResult) {
            //  console.log(req.body.pkey)
            return res.status(200).json({success: true});
        } else {
            //  console.log(req.body.pkey)
            return res.status(200).json({success: false});
        }
    }

    async KeyLogin(req, res) {
        const HwidResult = await KeyModel.findOne({hwid: req.body.hwid});
        if (HwidResult) {
            //   console.log(req.body.hwid)
            return res.status(200).json({success: true});
        } else {
            return res.status(200).json({success: false});
        }
    }
    async KeyHash(req, res) {
        const VersionResult = await VersionModel.findOne({ hash: req.body.hash });
console.log(req.body.hash)
        if (VersionResult) {
            return res.status(200).json({
                version: VersionResult.version,
                hash: VersionResult.hash
            });
        } else {
            return res.status(200).json({ message: "Hash not found" });
        }
    }
    async AddToPanelModel (req, res) {
        try {
            const SearchResult = await VersionModel.findOne ({hash: req.body.hash});
            if (SearchResult)
                return res.status(200).json({message: "Already exists"});
            const DbKey =
                new VersionModel({time: moment().format('DD.MM.YYYY'),
                    version: req.body.version, hash: req.body.hash
                })
            await DbKey.save();
            return res.status(200).json({success: true});
        }
        catch (e) { res.status(400).json({message: e}) }
    }

}
module.exports = new KeyApi()