import express from "express";
import ItemController from "../../controllers/Item.Service.js";

const router = express.Router();

router.get("/", ItemController.getItems);
router.post("/", ItemController.createItem);
router.get("/getOne/:id", ItemController.getItem);
router.put("/:id", ItemController.updateItem);
router.delete("/:id", ItemController.deleteItem);
router.get("/getByManufacturer/:id", ItemController.getItemsByManufacturerID);
router.get("/getByMaterial/:id", ItemController.getItemsByMaterialID);

export default router;
