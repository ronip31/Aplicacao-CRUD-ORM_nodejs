import express from 'express';


import { executelogin }
 from '../controllers/usuario/executeLogin.js';


const router = express.Router();

router.post('/fazlogin', executelogin);

//router.post('/verificarToken', verifyToken);

export default router;