import express from "express"
import * as dotenv from "dotenv"
import cors from "cors"
import corsOptions from "./src/config/corsOptions.config"

import { authRouter } from "./src/routes/auth.routes"
import { projectRouter } from "./src/routes/project.routes"
import { skillRouter } from "./src/routes/skill.routes"
import { emailRouter } from "./src/routes/email.routes"

dotenv.config()

const PORT = process.env.PORT || 8585

const app = express()

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use('/public', express.static('public'));

app.use("/auth", authRouter)
app.use("/projects", projectRouter)
app.use("/skills", skillRouter)
app.use("/email", emailRouter)

app.use("/", (req, res)=>{
    res.json({message:"Home"})
})


app.listen(PORT, ()=>{
    console.log("running on " + PORT)
})
