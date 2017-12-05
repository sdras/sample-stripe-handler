var stripe = require('stripe')('sk_test_js5LRkmS7OsYHtVc7XYvK9OB');
// ^ this is a stripe testing key

module.exports = function(context, req) {
  context.log('starting to get down');

  //if we have a request body, an email, and a token, let's get started
  if (
    req.body &&
    req.body.stripeEmail &&
    req.body.stripeToken &&
    req.body.stripeAmt
  ) {
    stripe.customers
      .create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
      })
      .then(customer => {
        context.log('starting the stripe charges');
        stripe.charges.create({
          amount: req.body.stripeAmt,
          description: 'Sample Charge',
          currency: 'usd',
          customer: customer.id
        });
      })
      .then(charge => {
        context.log('finished the stripe charges');
        context.res = {
          // status: 200
          body: 'This has been completed'
        };
        context.done();
      })
      .catch(err => {
        context.log(err);
        context.done();
      });
  } else {
    context.log(req.body);
    context.res = {
      status: 400,
      body: "We're missing something"
    };
    context.done();
  }
};
