require('dotenv').config();

const express = require ('express');
const router = require ('./router/index');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const path = require('path');


const server = express();
server.use(cors());
server.use(express.json());
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Устанавливаем лимит в 50MB для JSON и URL-encoded данных
server.use(express.json({ limit: '50mb' }));
server.use(express.urlencoded({ limit: '50mb', extended: true }));


const RunServer = async () => {
    try {
        await mongoose.connect (``);
        server.use ('/', router);
        server.listen(PORT, () => console.log(`Started ${PORT}`));
    }
    catch (e) { console.log(e); }
}

RunServer()