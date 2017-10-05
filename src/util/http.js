import { isEmpty, extend } from 'lodash'

/**
 * Wrapper for API functions called via an HTTP request.
 * Abstracts ExpressJS req and res objects so controllers can be reused.
 *
 * @param {Function} apiMethod API method to call
 * @return {Function} middleware format function to call on a matching request
 */
export default function http (apiMethod) {
  return function apiHandler (req, res, next) {

    // Merge req.query, req.params and res.locals on a single object
    let options = extend({}, req.query, req.params, { context: res.locals })
    let object = req.body

    // If this is a GET or DELETE req.body should be null
    // so we only have options
    if (isEmpty(object)) {
      object = options
      options = {}
    }

    return apiMethod(object, options)
      .then(response => {
        if (req.method === 'DELETE') {
          res.status(204)
        }

        return res.json(response || {})
      })
      // "Catch-all" error handler
      // This allows us to use Async/Await on controllers
      // and models without a try/catch every time
      .catch(next)
  }
}
