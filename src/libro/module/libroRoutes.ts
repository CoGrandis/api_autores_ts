import { libroController } from "./libroController";
import  express  from "express";
const router = express.Router()

router.get('', libroController.getLibros)
router.post('', libroController.insertLibro)

export {router}