const express = require("express"); // express를 가져오는 명령어
const axios = require("axios"); // axios를 가져다 쓸거다.
const cors = require("cors"); // 포트가 다른 두 서버를 연결
const app = express();
const dotenv = require("dotenv").config();
const NAVER_ID = process.env.NAVER_ID;
const NAVER_SECRET_ID = process.env.NAVER_SECRET_ID;
app.set("port", process.env.PORT || 8099);
const PORT = app.get("port");
app.use(cors()); // 모든 요청에 대해서 access-control-allow-를 붙여서 준다.

// 라우팅. (특정 주소로 들어오면 해야되는 일 / res 응답 / req 요청)
app.get("/", (req, res) => {
  res.send("HI");
});

// 중간 대리인 역할
app.get("/book/:bookname", (req, res) => {
  const queryTxt = encodeURIComponent(req.params.bookname);
  // console.log(req.params.bookname);
  axios({
    url: `https://openapi.naver.com/v1/search/book.json?query=${queryTxt}`,
    headers: {
      "X-Naver-Client-Id": NAVER_ID,
      "X-Naver-Client-Secret": NAVER_SECRET_ID,
    },
  }).then(function (response) {
    // console.log(response.data);
    res.json(response.data);
  });
  // res.json({ book: "express" });
});

app.get("/book02", (req, res) => {
  const queryTxt = encodeURIComponent(req.query.bookname);
  axios({
    url: `https://openapi.naver.com/v1/search/book.json?query=${queryTxt}`,
    headers: {
      "X-Naver-Client-Id": NAVER_ID,
      "X-Naver-Client-Secret": NAVER_SECRET_ID,
    },
  }).then(function (response) {
    res.json(response.data);
  });
});

// app.get("/login", (req, res) => {
//   console.log(req.query);
//   if (req.query.id === "kwlee" && req.query.pw === "123123") {
//     res.json({ isLogged: true });
//   } else {
//     res.json({ isLogged: false });
//   }
// });

app.listen(PORT, function () {
  console.log(`${PORT}에서 서버 대기중`);
});
