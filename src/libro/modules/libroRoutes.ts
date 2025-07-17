import { libroController } from "./libroController";
import { bodyParamsSchema, routeParamsSchema, queryParamsSchema } from "./libroSchema";
// import { bodyParamValidate, requestParamIdValidate, requestQueryValidate } from "src/shared/middleware/validacionRequest";
import  express  from "express";
const router = express.Router()

router.get('',libroController.getLibros)
router.post('', libroController.insertLibro)
router.put('/:id', libroController.updateLibro)
router.delete('/:id', libroController.deleteLibro)

export {router}