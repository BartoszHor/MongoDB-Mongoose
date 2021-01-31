const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
    name: { type: String, required: true },
    client: { type: String, required: true },
})

module.exports = mongoose.model('Product', productsSchema)