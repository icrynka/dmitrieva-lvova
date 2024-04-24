const mysql = require('mysql2');
require('dotenv').config();

console.log("JAWSDB_URL:", process.env.JAWSDB_URL); // Логируем строку подключения

// Проверка на наличие строки подключения
if (!process.env.JAWSDB_URL) {
    console.error("Не определена переменная окружения JAWSDB_URL");
    process.exit(1); // Завершение процесса с ошибкой
}

const pool = mysql.createPool({
    uri: process.env.JAWSDB_URL
});

module.exports = pool.promise();
