import { libroController } from "./libroController";
import { bodyParamsSchema, routeParamsSchema, queryParamsSchema } from "./libroSchema";
import { bodyParamValidate, requestQueryValidate, requestParamIdValidate } from "@middleware/validacionRequest";
import  express  from "express";
const router = express.Router()

router.get('',requestQueryValidate(queryParamsSchema),libroController.getLibros)
router.post('', bodyParamValidate(bodyParamsSchema),libroController.insertLibro)
router.put('/:id',requestParamIdValidate(routeParamsSchema),bodyParamValidate(bodyParamsSchema), libroController.updateLibro)
router.delete('/:id',requestParamIdValidate(routeParamsSchema), libroController.deleteLibro)

export {router}