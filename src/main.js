// @ts-check
// 프레임워크 없이 간단한 토이프로젝트 웹 서버 만들어보기

/**
 * 블로그 포스팅 서비스
 * - 로컬 파일을 데이터베이스로 활용할 예정 (JSON)
 * - 인증 로직은 넣지 않습니다.
 * - REST ful API 를 사용합니다.
 */

const http = require('http')
const {ifError} = require("assert");

// JSDOC
/**
 * @typedef Post
 * @property {String} id
 * @property {String} title
 * @property {String} content
 */

/**
 * @type {Post}
 */
const examplePost = {
  id: 'abc',
  title: 'abc',
  content: 'abc'
}
/**
 * @type {Post[]}
 */
const posts = [
  {
    id: 'my_first_post',
    title: 'My First Post',
    content: 'Hello'
  },
  {
    id: 'my_second_post',
    title: '나의 두번째 포스트',
    content: 'Second Post'
  },
]

/**
 * Post ( 블로그 글 )
 *
 * GET /posts
 * GET /posts/:id
 * POST /posts
 */
const server = http.createServer((req, res) => {
  const POST_ID_REGEX = /^\/posts\/([a-zA-Z0-9-_]+)$/ //캡처그룹을 활용해 뽑아내기 () 활용 -> .exec 의 1번인덱스배열로 값이나온다.
  const postIdRegexResult = req.url && POST_ID_REGEX.exec(req.url) || undefined // .exec() 정보를 돌려줌
  if (req.url === '/posts' && req.method === 'GET') {

    const result = {
      posts: posts.map(post => ({
        id: post.id,
        title: post.title
      })),
      totalCount: posts.length
    }

    res.statusCode == 200
    res.setHeader('Content-Type', 'application/json; encoding=utf-8')
    res.end(JSON.stringify(result))

  // } else if (req.url === '/posts/:id') {
  } else if (postIdRegexResult && req.method === 'GET') { // ^시작부분 \ 특수문자위한 이스케이프 $끝나는부분 +여러개 .test()존재하는지 검사
    const postId = postIdRegexResult[1]
    console.log(postId)

    const post = posts.find(_post => _post.id === postId) // 변수이름이 동일할경우 _줘서 쉐도잉
    if (post) {
      res.statusCode == 200;
      res.setHeader('Content-Type', 'application/json; encoding=utf-8')
      res.end(JSON.stringify(post));
    } else {
      res.statusCode == 404;
      res.end('Post Not Found')
    }

  } else if (req.url === '/posts' && req.method === 'POST') {

    req.setEncoding('utf-8')
    req.on('data', data => {
      console.log(data)
      /**
       * @typedef CreatePostBody
       * @property {String} title
       * @property {String} content
       * */
      /** @type {CreatePostBody} */
      const body = JSON.parse(data)
      console.log(body)
      posts.push({
        // id: body.title.toLocaleLowerCase().replaceAll(' ', '_'),
        id: body.title.toLocaleLowerCase().replace(/\s/g, '_'), // s공백을 전부g
        ...body
      })
    })
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
  // console.log('Request accepted')

  // res.statusCode = 200
  // res.end('Hello')
})

const PORT = 4000

server.listen(PORT, () => {
  console.log('The Server is listening at port : ', PORT)
})
