import express from "express";
import SellerController from "../../controllers/Seller.Service.js";

const router = express.Router();

router.get("/", SellerController.getSellers);
router.post("/", SellerController.createSeller);
router.get("/:id", SellerController.getSeller);
router.put("/:id", SellerController.updateSeller);
router.delete("/:id", SellerController.deleteSeller);
router.post("/login", SellerController.loginSeller);

export default router;
