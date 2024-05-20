import AuthRouter from "./auth";

import express from 'express'
const Routers = express.Router();

Routers.use('/', AuthRouter)

export default Routers