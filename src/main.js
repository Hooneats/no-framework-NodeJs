// @ts-check
// 프레임워크 없이 간단한 토이프로젝트 웹 서버 만들어보기

/**
 * 블로그 포스팅 서비스
 * - 로컬 파일을 데이터베이스로 활용할 예정 (JSON)
 * - 인증 로직은 넣지 않습니다.
 * - REST ful API 를 사용합니다.
 */

const http = require('http')

/**
 * Post ( 블로그 글 )
 *
 * GET /posts
 * GET /posts/:id
 * POST /posts
 */
const server = http.createServer((req, res) => {
  if (req.url === '/posts' && req.method === 'GET') {
    res.statusCode == 200
    res.end('List of Posts')
  // } else if (req.url === '/posts/:id') {
  } else if (req.url && /^\/posts\/[a-zA-Z0-9-_]+$/.test(req.url)) { // ^시작부분 \ 특수문자위한 이스케이프 $끝나는부분 +여러개 .test()존재하는지 검사
    res.statusCode == 200
    res.end('Some content of the posts')
  } else if (req.url === '/posts/' && req.method === 'POSTS') {
    res.statusCode == 200
    res.end('Creating posts')
  } else {
    res.statusCode === 400
    res.end('NOT FOUND')
  }

  // 어떤 url(타겟) 로 요청이 왔는지
  console.log(req.url)
  // npm i --save-dev nodemon
  // package.json scripts 에 scripts 'server' : 'nodemon src/main.js 추가후
  // npm run server 실행 -> 자도 서버 업데이트
  console.log('Request accepted')

  // res.statusCode = 200
  // res.end('Hello')
})

const PORT = 4000

server.listen(PORT, () => {
  console.log('The Server is listening at port : ', PORT)
})
