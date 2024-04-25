/* const mysql = require('mysql2');
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
    port: 3306, // Замените на порт сервера MySQL, если он отличается от стандартного
	
});

module.exports = pool.promise();
 */
 
 
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://dmitrieva:qwer1234@185.250.46.244:27017/db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
}).catch(err => {
  console.error('Connection error', err);
});

const app = express();

// Middleware для разбора JSON тел запросов
app.use(express.json());

// Определение схемы и модели пользователя
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  // Другие поля...
});
const User = mongoose.model('User', userSchema);

// Маршруты
app.post('/users', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании пользователя', error });
  }
});

// Слушать на порту
const PORT = process.env.PORT || 3265;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});