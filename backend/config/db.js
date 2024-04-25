const mysql = require('mysql2');
require('dotenv').config();

console.log("JAWSDB_URL:", process.env.JAWSDB_URL); // Логируем строку подключения

// Проверка на наличие строки подключения
if (!process.env.JAWSDB_URL) {
    console.error("Не определена переменная окружения JAWSDB_URL");
    process.exit(1); // Завершение процесса с ошибкой
}

const pool = mysql.createPool({
    //uri: process.env.JAWSDB_URL
	host: 185.250.46.244, // Замените на адрес вашего сервера БД
    user: dmitrieva, // Замените на имя пользователя БД
    database: db, // Замените на название вашей БД
    password: qwer1234, // Замените на пароль от пользователя БД
    port: 3264, // Замените на порт сервера MySQL, если он отличается от стандартного
	
});

module.exports = pool.promise();

