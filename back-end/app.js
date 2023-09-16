import express from "express"
import cookieParser  from "cookie-parser"
import cors from "cors"
import mongoose  from "mongoose"
import dotenv from "dotenv"

// import routes
import authRoute from "./routes/authRoute.js"
import userRoute from "./routes/userRoute.js"
import doctorRoute from "./routes/doctorRoute.js"
import reviewRoute from "./routes/reviewRoute.js"


dotenv.config()

const app = express()

const port = process.env.PORT || 5000

const corsOptions = {
    origin:true
}

app.get('/', (req, res) => {
    res.send("Api is Working")
})

// db connection 
mongoose.set("strictQuery", false)
const connetToDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("connected to database successfully")
    } catch (error) {
        console.log("connection to database failed /n", error)
    }
}

// Middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))

// routes 
app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/doctor', doctorRoute)
app.use('/api/review', reviewRoute)



app.listen(port, () => {
    connetToDB()
    console.log(`server is running on port ${port}`)
})