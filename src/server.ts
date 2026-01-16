import express from "express";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import router from "./router";
import db from "./config/db";
import swaggerUI from "swagger-ui-express";
import swaggerSpec, { SwaggerUiOptions } from "./config/swagger";

// Conectar a base de datos
export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    // console.log( colors.blue( 'Conexión exitosa a la BD'))
  } catch (error) {
    // console.log(error)
    console.log(colors.red.bold("Hubo un error al conectar a la BD"));
  }
}
connectDB();

// Instancia de express
const server = express();

//Permitir conexiones desde otros orígenes
const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL || !origin) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  }
};

server.use(cors(corsOptions));
// Leer datos de formularios
server.use(express.json());
server.use(morgan('dev'));
server.use("/api/products", router);

//Docs
server.use(
  "/docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec, SwaggerUiOptions)
);

export default server;
