import { Router } from "express";
import { getAllSupplies , addSupply ,getSupplieById ,gainSupplie , sellSupplie  } from "../controllers/supplie_controller";
import { getAllLogs ,getReportDay} from './../controllers/log_controller';

const router = Router();

router.get("/supplies", getAllSupplies);

router.get("/reportDay", getReportDay);

router.get("/supplies/:Id",getSupplieById);

router.post("/supplies", addSupply);

router.get("/logs",getAllLogs);

// patch gain supplie and one more route for the sell

router.patch("/supplie/sell", sellSupplie)

router.patch("/supplie/gain",gainSupplie)

export default router;
