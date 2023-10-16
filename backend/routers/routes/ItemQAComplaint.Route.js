import express from "express";
import ItemQAComplaintController from "../../controllers/ItemQAComplaint.Service.js";

const router = express.Router();

router.get("/", ItemQAComplaintController.getItemQAComplaints);
router.post("/", ItemQAComplaintController.createItemQAComplaint);
router.get("/getOne/:id", ItemQAComplaintController.getItemQAComplaint);
router.put("/:id", ItemQAComplaintController.updateItemQAComplaint);
router.delete("/:id", ItemQAComplaintController.deleteItemQAComplaint);
router.get(
  "/itemOrderID/:id",
  ItemQAComplaintController.getItemQAComplaintsByItemOrderID
);

export default router;
