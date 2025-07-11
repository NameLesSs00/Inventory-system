import { Router } from "express";
import { getAllSupplies , addSupply ,getSupplieById } from "../controllers/supplie_controller";
import { getAllLogs } from './../controllers/log_controller';

const router = Router();

router.get("/supplies", getAllSupplies);

router.get("/supplies/:Id",getSupplieById);

router.post("/supplies", addSupply);

router.get("/logs",getAllLogs);


export default router;
