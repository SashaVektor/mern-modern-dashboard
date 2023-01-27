import express from 'express'
import {getAdmins, getUserPerfomance} from '../controllers/managment.js'

const router = express.Router();
router.get("/admins", getAdmins)
router.get("/perfomance/:id", getUserPerfomance)

export default router