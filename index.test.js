const requiremd = require('./index')

test('The MarkDown File Need to be right', async () => {
  const obj = await requiremd('./example.md')

  expect(typeof requiremd).toEqual('function')
  expect(obj).toEqual({
    'body': '# Great Article\nGreat text',
    'data': {
      'title': 'Great article',
      'author': 'R.J. Rushdoony, J. Morecraft',
      'data': '1989-10-10',
      'article-tag': 'Theonomy'
    }
  })
})
