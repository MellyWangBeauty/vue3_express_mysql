const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const bangumiData = require("bangumi-data");
const axios = require("axios");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000", // 允许的来源
    methods: ["*"], // 允许的 HTTP 方法
    allowedHeaders: ["Content-Type", "Authorization"], // 允许的请求头
  })
);

// 创建与 MySQL 数据库的连接
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qaz741",
  database: "vue_express_mysql",
});

// 建立与数据库的连接
connection.connect((err) => {
  if (err) {
    console.error("数据库连接失败：", err);
  } else {
    console.log("成功连接到数据库");
  }
});

// 创建学生信息表
connection.query(
  `CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  age INT NOT NULL
)`,
  (err) => {
    if (err) {
      console.error("创建学生信息表失败：", err);
    } else {
      console.log("成功创建学生信息表");
    }
  }
);

// 获取学生列表
app.get("/students", (req, res) => {
  connection.query("SELECT * FROM students", (err, results) => {
    if (err) {
      console.error("获取学生列表失败：", err);
      res.status(500).json({ error: "获取学生列表失败" });
    } else {
      res.json(results);
    }
  });
});

// 获取学生列表
app.get("/animes", (req, res) => {
  const animeData = bangumiData.items;
  // 将animeData作为JSON数据发送给客户端
  res.json(animeData);
});

app.get("/seasons", (req, res) => {
  axios
    .get("https://api.anime-data.com/seasons")
    .then((response) => {
      const responseData = response.data;
      res.json(responseData);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch anime seasons data" });
    });
});

// 新增学生
app.post("/students", (req, res) => {
  const { name, age } = req.body;
  connection.query(
    "INSERT INTO students (name, age) VALUES (?, ?)",
    [name, age],
    (err, result) => {
      if (err) {
        console.error("新增学生失败：", err);
        res.status(500).json({ error: "新增学生失败" });
      } else {
        res.json({ message: "成功新增学生", id: result.insertId });
      }
    }
  );
});

// 启动服务器
app.listen(5000, () => {
  console.log("应用程序已启动，监听端口 5000");
});
