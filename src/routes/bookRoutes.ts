import { Router } from "express";
import {
    getBooks,
    addBook,
    updateBook,
    deleteBook,
    borrowBook,
    returnBook,
    getRecommendations,
} from "../controllers/bookController";

const router: Router = Router();

/**
 * Define routes for book management
 */
router.get("/", getBooks);
router.post("/", addBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
router.post("/:id/borrow", borrowBook);
router.post("/:id/return", returnBook);
router.get("/recommendations", getRecommendations);

export default router;