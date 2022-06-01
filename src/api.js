// @ts-check

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
  content: 'abc',
}
/**
 * @type {Post[]}
 */
const posts = [
  {
    id: 'my_first_post',
    title: 'My First Post',
    content: 'Hello',
  },
  {
    id: 'my_second_post',
    title: '나의 두번째 포스트',
    content: 'Second Post',
  },
]

/**
 * @typedef APIResponse
 * @property {number} statusCode
 * @property {String | Object} body
 */
/**
 * @typedef Route
 * @property {RegExp} url
 * @property {'GET' | 'POST'} method
 * @property {(matches: string[], body: Object.<string, *> | undefined) => Promise<APIResponse>} callback
 */
// {*} callback
//{(values: Object) => string} callback
//{() => string} callback

/**
 * @type {Route[]}
 */
const routes = [
  {
    url: /^\/posts$/,
    method: 'GET',
    callback: async () => ({
      //TODO implements
      statusCode: 200,
      body: posts,
    }),
  },
  {
    url: /^\/posts\/([a-zA-Z0-9-_]+)$/, // TODO: RegExp로 고쳐야함
    method: 'GET',
    callback: async (matches) => {
      const postId = matches[1]
      if (!postId) {
        return {
          statusCode: 404,
          body: 'NOT FOUND',
        }
      }

      const post = posts.find((_post) => _post.id === postId)
      if (!post) {
        return {
          statusCode: 404,
          body: 'NOT FOUND',
        }
      }
      return {
          statusCode: 200,
          body: post,
      }
    },
  },
  {
    url: /^\/posts$/,
    method: 'POST',
    callback: async (_, body) => {
        if (!body) {
            return {
                statusCode: 400,
                body: 'Ill-formed-Request'
            }
        }
        /**
         * @typedef createPostBody
         * @property {String} title
         * @property {String} content
         */
        /**
         * @type {createPostBody}
         */
        const post = body;
        console.log(body)

        /**
         * @type {string}
         */
        const title = body.title
        const newPost = {
            id: title.replace(/\s/g, '_'),
            title: title,
            content: body.content,
        }
        posts.push(newPost)

        return{
            statusCode: 200,
            body: newPost
        }
    },
  },
]

/*
    callback: async () => {
      return {
        statusCode: 200,
        body: {},
      }
    }
    는
    callback: async () => ({
        statusCode: 200,
        body: {},
    })
    와 같다.
 */

module.exports = {
  routes,
}
