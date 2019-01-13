const model = require('../model')

exports.placeOrder = async function (userId, addressId, connections) {
  let order = await model.submitOrder(userId, addressId).catch(console.log)
  connections[order.restaurant].emit('newOrder', order)
}

exports.acceptOrder = async function (orderId, connections) {
  console.log('Order accepted')
  let order = await model.acceptOrder(orderId).catch(console.log)
  Object.keys(connections.deliverers).forEach(id => connections.deliverers[id].socket.emit('newOrder', order)) // change to nearby deliverers
  connections[order.customer].emit('orderAccepted', orderId)
  connections[order.restaurant].emit('updateOrderStatus', order)
}

exports.acceptDelivery = async function (delivererId, orderId, connections) {
  console.log('Delivery accepted')
  let res = await model.acceptDelivery(delivererId, orderId).catch(console.log)
  if (res) {
    connections[res.customer].emit('delivererAssigned', orderId, res.deliverer)
    Object.entries(connections.deliverers).forEach(([key, value]) => value.socket.emit('orderTaken'))
    // only emit event to previously messaged deliverers
  }
}

exports.arrivedRestaurant = async function (orderId, connections) {
  let order = await model.getOrderDetails(orderId).catch(console.log)
  connections[order.restaurant].emit('updateOrderStatus', order)
  connections[order.customer].emit('delivererArrivedRestaurant', orderId)
}

exports.pickedUp = async function (orderId, connections) {
  console.log('Order picked up')
  let order = await model.pickedUp(orderId).catch(console.log)
  connections[order.customer].emit('orderPickedUp', orderId)
  connections[order.restaurant].emit('updateOrderStatus', order)
}

exports.delivered = async function (orderId, connections) {
  console.log('Order delivered')
  let order = await model.delivered(orderId).catch(console.log)
  connections[order.customer].emit('orderDelivered', orderId)
}

exports.updateLocation = async function (delivererId, lat, long, connections) {
  connections.deliverers[delivererId].latitude = lat
  connections.deliverers[delivererId].longitude = long
  let customers = await model.getCustomers(delivererId)
  customers.forEach(id => connections[id].emit('updateLocation', [lat, long]))
}
