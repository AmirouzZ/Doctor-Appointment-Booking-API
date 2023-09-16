
import express from "express"
import {updateUser, deleteUser, getAllUsers, getSingleUser} from "../controllers/userCtrl.js"
const router = express.Router()
import {authenticate, allow} from '../auth/verifyToken.js'
import { Admin } from "mongodb"

router.get('/:id', authenticate, allow(["admin", "patient"]), getSingleUser)
router.get('/', authenticate, allow(["admin"]), getAllUsers)
router.put('/:id', authenticate, allow(["patient"]), updateUser)
router.delete('/:id', authenticate, allow(["admin", "patient"]), deleteUser)

export default router