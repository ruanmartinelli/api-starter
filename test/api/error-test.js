module.exports = (request, test) => {
  test('Error: 404 if resource does not exist', async t => {
    const response = await request.get('/api/cobol-programmers')

    t.is(response.status, 404)
  })
}
