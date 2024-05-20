import express from 'express'
import { AuthController } from '../controllers/auth.controller';
import validateRequest from '../middlewares/requestValidator';
import { validateCreateAccountReqSchema } from '../middlewares/auth/request';
const Router = express.Router();




// Authentication
Router.post('/account', validateCreateAccountReqSchema(), validateRequest, AuthController.createAccount)
Router.post('/account/auth', AuthController.login)
Router.get('/account', AuthController.getAccountDetails)


export default Router