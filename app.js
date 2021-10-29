require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const express = require('express')
const path = require('path')
const AuthRouter = require('./routes/auth.routes')
const ProductRouter = require('./routes/product.routes')
const CartRouter = require('./routes/cart.routes')
const OrdersRouter = require('./routes/orders.routes')
const config = require('config')

const app = express()

const PORT = process.env.PORT || 5001

app.use(express.static(__dirname));
app.use(cors())
app.use(express.json())
app.use('/api/auth', AuthRouter)
app.use('/api/products', ProductRouter)
app.use('/api/cart', CartRouter)
app.use('/api/orders', OrdersRouter)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../client/build'))
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

const start = async () => {
    try {
        await mongoose.connect(config.get("MONGO"))
        app.listen(PORT, () => console.log(`Server has been started on ${PORT} port`))
    } catch (e) {
        console.log('Server error', e.message)
    }
}

start()