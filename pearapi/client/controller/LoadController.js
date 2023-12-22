const multer = require('multer');
const path = require('path');

// Настройка multer для загрузки файлов
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads')); // Путь к директории загрузок
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);  // Добавляем timestamp к имени файла для уникальности
    }
});

const upload = multer({ storage: storage });

exports.uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Файл не передан' });
    }

    // Сформируем URL для доступа к файлу
    const fileURL = `https://add.pearpanel.info/uploads/${req.file.filename}`;

    res.status(200).json({ message: 'Файл успешно загружен', url: fileURL });
};

// Экспортируем настроенный multer для использования в роутере
exports.uploadMiddleware = upload.single('file');
