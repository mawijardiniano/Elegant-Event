const stripe = require("../config/stripe");

exports.createPayment = async (req, res) => {
  const {amount} = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "php",
      payment_method_types: ["card"],
    });

    res.status(200).json({ clientSecret: payment.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
