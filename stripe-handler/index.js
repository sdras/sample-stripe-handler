var stripe = require('stripe')('sk_test_js5LRkmS7OsYHtVc7XYvK9OB');

module.exports = function(context, req) {
  context.log('we starting to get down');

  //if we have a request body, an email, and a token, let's get started
  if (req.body && req.body.stripeEmail && req.body.stripeToken) {
    stripe.customers
      .create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
      })
      .then(customer =>
        stripe.charges.create({
          amount,
          description: 'Sample Charge',
          currency: 'usd',
          customer: customer.id
        })
      )
      .then(charge => {
        context.res = {
          // status: 200
          body: 'This has been completed'
        };
        context.done();
      });
  } else {
    context.res = {
      status: 400,
      body: "We're missing something"
    };
    context.done();
  }
};
