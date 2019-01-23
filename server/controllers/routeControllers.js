const model = require('../model')
const auth = require('@vinayakrugvedi/authjs')

exports.getDummyUser = async function (req, res) {
  let result = await model.getDummyUser().catch(console.log)
  res.send({ id: result })
}

exports.getDummyRestaurant = async function (req, res) {
  let result = await model.getDummyRestaurant().catch(console.log)
  res.send({ id: result })
}

exports.getDummyDeliverer = async function (req, res) {
  let result = await model.getDummyDeliverer().catch(console.log)
  res.send({ id: result })
}

exports.addUser = async function (req, res) {
  let result = await model.addUser(req.body.name).catch(console.log)
  res.send(result)
}

exports.addRestaurant = async function (req, res) {
  let result = await model.addRestaurant(req.body).catch(console.log)
  res.send(result)
}

exports.addDeliverer = async function (req, res) {
  let result = await model.addDeliverer(req.body.name).catch(console.log)
  res.send(result)
}

exports.addItem = async function (req, res) {
  let result = await model.addItem(req.params.restaurantId, req.body.item, req.body.category).catch(console.log)
  res.send(result)
}

exports.getRestaurants = async function (req, res) {
  let result = await model.getRestaurants().catch(console.log)
  res.send(result)
}

exports.getMenu = async function (req, res) {
  let result = await model.getMenu(req.params.restaurantId).catch(console.log)
  res.send(result)
}

exports.getCart = async function (req, res) {
  let result = await model.getCart(req.params.userId).catch(console.log)
  res.send(result)
}

exports.getAddresses = async function (req, res) {
  let result = await model.getAddresses(req.params.userId).catch(console.log)
  res.send({ addresses: result })
}

exports.addItemToCart = async function (req, res) {
  let result = await model.addToCart(req.params.userId, req.params.itemId).catch(console.log)
  res.send(result)
}

exports.removeItemFromCart = async function (req, res) {
  let result = await model.removeFromCart(req.params.userId, req.params.itemId).catch(console.log)
  res.send(result)
}

exports.addAddress = async function (req, res) { // need to add geocoding as middleware here
  let result = await model.addAddress(req.params.userId, req.params.addressType, req.body.address).catch(console.log)
  res.send({ addresses: result })
}

exports.setCart = async function (req, res) {
  let result = await model.setCart(req.params.userId, req.body.cart).catch(console.log)
  res.send(result)
}

exports.register = async function (req, res) {
  let result = await auth.signUp(req.params.email, req.params.password).catch(console.log)
  if (result.authCode === 14) {
    auth.resendVerificationLink(req.params.email).catch(console.log)
  }
  res.send({ code: result.authCode })
}

exports.login = async function (req, res) {
  let result = await auth.signIn(req.params.email, req.params.password).catch(console.log)
  let user = { id: null }
  if (result.authCode === 14) {
    auth.resendVerificationLink(req.params.email).catch(console.log)
  }
  if (result.authCode === 3) {
    let match = /^(\S+)@/.exec(req.params.email)
    user = await model.findUser(match[1]).catch(console.log)
  }
  res.send({ code: result.authCode, user: user.id })
}

exports.verify = async function (req, res) {
  let result = await auth.verify(req.params.token).catch(console.log)
  console.log('Result is', result) // debug
  if (result.authCode === 3) {
    let match = /: (\S+)@/.exec(result.authMessage)
    let res = await model.addUser(match[1]).catch(console.log)
    console.log('Model response is', res)
    res.send('You have been successfully verified. Please proceed to login.')
  } else if (result.authCode === 24) {
    // auth.resendVerificationLink(email)
    res.send('Your link has expired. A new link has been sent to your email address.')
  } else if (result.authCode === 23) {
    res.send('This token is invalid. ')
  } else if (result.authCode === 15) {
    res.send('Your account has already been verified. Please login.')
  }
}
