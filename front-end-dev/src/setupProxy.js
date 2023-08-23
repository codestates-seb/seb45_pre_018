// const { createProxyMiddleware } = require('http-proxy-middleware')

// module.exports = function (app) {
//   // 프록시 설정 추가
//   app.use(
//     '/questions', // 프록시 경로 설정
//     createProxyMiddleware({
//       target: 'http://ec2-13-125-118-42.ap-northeast-2.compute.amazonaws.com:8080/', // 실제 서버 주소
//       changeOrigin: true,
//     }),
//   )
// }
