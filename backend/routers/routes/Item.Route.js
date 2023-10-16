import express from "express";
import ItemController from "../../controllers/Item.Service.js";

const router = express.Router();

router.get("/", ItemController.getItems);
router.post("/", ItemController.createItem);
router.get("/:id", ItemController.getItem);
router.put("/:id", ItemController.updateItem);
router.delete("/:id", ItemController.deleteItem);

export default router;
