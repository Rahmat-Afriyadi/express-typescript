import cors from "cors"

const allowedOrigins = ["http://localhost:3000"]

const corsOptions : cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200,
}

export default corsOptions
