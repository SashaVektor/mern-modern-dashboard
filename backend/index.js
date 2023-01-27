import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import clientRoutes from './routes/client.js'
import generalRoutes from './routes/general.js'
import managmentRoutes from './routes/managment.js'
import salesRoutes from './routes/sales.js'


import User from './models/User.js'
import {
    dataUser, dataProduct, dataProductStat, dataTransaction,
    dataOverallStat, dataAffiliateStat
} from './data/index.js'
import Product from './models/Product.js'
import ProductStat from './models/ProductStat.js'
import Transaction from './models/Transaction.js'
import OverallStat from './models/OverallStet.js'
import AffiliateStat from './models/AffiliateStat.js'


dotenv.config();
const app = express();
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
}))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use("/client", clientRoutes)
app.use("/general", generalRoutes)
app.use("/managment", managmentRoutes)
app.use("/sales", salesRoutes)

const PORT = process.env.PORT || 5000
mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => console.log(`Server port: ${PORT}`))
    // User.insertMany(dataUser)
    // Product.insertMany(dataProduct)
    // ProductStat.insertMany(dataProductStat)
    // Transaction.insertMany(dataTransaction)
    // OverallStat.insertMany(dataOverallStat)
    // AffiliateStat.insertMany(dataAffiliateStat)
}).catch((err) => console.log(err.message))