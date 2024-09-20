import { Router } from "express";
import bodyParser from 'body-parser';

import {
    cadastrar,
    login,
    getAll
} from "../controllers/usuariosControllers.js"


const router = Router()

router.post("/create",cadastrar)
router.get("/login", login)
router.get("/todos", getAll)

export default router;