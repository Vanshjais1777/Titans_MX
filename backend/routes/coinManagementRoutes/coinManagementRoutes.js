import express from "express";
import {getUserCoins} from "../../controllers/coinControllers/coinController.js";

const router = express.Router();

router.get("/getCoin",getUserCoins);

export default router;
