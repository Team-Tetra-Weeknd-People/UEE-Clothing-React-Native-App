import express from "express";
import ItemQAController from "../../controllers/ItemQA.Service.js";

const router = express.Router();

router.get("/", ItemQAController.getItemQAs);
router.post("/", ItemQAController.createItemQA);
router.get("/getOne/:id", ItemQAController.getItemQA);
router.put("/:id", ItemQAController.updateItemQA);
router.delete("/:id", ItemQAController.deleteItemQA);
router.get("/itemID/:id", ItemQAController.getItemQAsByItemID);

export default router;
