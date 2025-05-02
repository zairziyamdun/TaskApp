const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = process.env.JWT_SECRET || "TaskappSuperSecret";

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email уже используется" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ message: "Пользователь создан" });
  } catch (err) {
    res.status(500).json({ error: "Ошибка регистрации" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "Пользователь не найден" });

    if (user.isBlocked) {
        return res.status(403).json({ error: "Аккаунт заблокирован администратором" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Неверный пароль" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Ошибка входа" });
  }
};
