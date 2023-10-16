import express from "express";
import ProcessManagerController from "../../controllers/ProcessManager.Service.js";

const router = express.Router();

router.get("/", ProcessManagerController.getProcessManagers);
router.post("/", ProcessManagerController.createProcessManager);
router.get("/:id", ProcessManagerController.getProcessManager);
router.put("/:id", ProcessManagerController.updateProcessManager);
router.delete("/:id", ProcessManagerController.deleteProcessManager);
router.post("/login", ProcessManagerController.loginProcessManager);

export default router;
