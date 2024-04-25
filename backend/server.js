const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 

const app = express();

// Body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Подключение к MongoDB
mongoose.connect('mongodb://dmitrieva:qwer1234@185.250.46.244:3264/db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Здесь вы определите свои схемы и модели, например:
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  // Дополните схему вашими полями
});

const User = mongoose.model('User', userSchema);

// Здесь вы добавите маршруты для обработки запросов
app.post('/users', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Замените остальную часть вашего серверного кода здесь...

// Запуск сервера
const PORT = process.env.PORT || 5174; 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
