module.exports = (request, test) => {
  test('Errors: 404 if resource does not exist', async t => {
    const { status } = await request.get('/api/cobol-programmers')

    t.is(status, 404)
  })

  test('Errors: 403 if private route and no token', async t => {
    const { status } = await request.get('/api/user', {
      headers: {
        'Authorization': ''
      }
    })

    t.is(status, 403)
  })
}
