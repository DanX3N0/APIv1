import { Router } from "../deps.ts";
import {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} from "../controllers/newsController.ts";

const router = new Router();

router
  .get("/v1/news", getAllNews)
  .get("/v1/news/:id", getNewsById)
  .post("/v1/news", createNews)
  .put("/v1/news/:id", updateNews)
  .delete("/v1/news/:id", deleteNews);

export default router;