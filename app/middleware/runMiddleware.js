// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
const runMiddleware = (req, res, middleware) => new Promise((resolve, reject) => {
  middleware(req, res)
    .then(result => resolve(result))
    .catch(err => reject(err));
});


module.exports = runMiddleware;