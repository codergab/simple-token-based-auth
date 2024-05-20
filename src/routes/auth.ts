import express from 'express'
import { AuthController } from '../controllers/auth.controller';
import validateRequest from '../middlewares/requestValidator';
import { validateCreateAccountReqSchema, validateLoginReqSchema } from '../middlewares/auth/request';
import { authenticatedUser } from '../auth/auth';
const Router = express.Router();




// Authentication
Router.post('/account', validateCreateAccountReqSchema(), validateRequest, AuthController.createAccount)
Router.post('/account/auth', validateLoginReqSchema(), validateRequest, AuthController.login)
Router.get('/account', authenticatedUser, AuthController.getAccountDetails)


export default Router