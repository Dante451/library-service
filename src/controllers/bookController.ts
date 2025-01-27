import { Request, Response } from "express";
import * as bookService from "../services/bookService";

export const getBooks = (req: Request, res: Response): void => {
    const { title, author, genre } = req.query;

    const filters = {
        title: title ? (title as string) : undefined,
        author: author ? (author as string) : undefined,
        genre: genre ? (genre as string) : undefined,
    };

    const books = bookService.getAllBooks(filters);

    res.json({
        message: "Books retrieved",
        data: books,
    });
};

export const addBook = (req: Request, res: Response): void => {
    try {
        const newBook = req.body;
        const createdBook = bookService.addBook(newBook);
        res.status(201).json({ message: "Book added", data: createdBook });
    } catch (error) {
        res.status(500).json({ message: "Error adding book" });
    }
};

export const updateBook = (req: Request, res: Response): void => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedBook = bookService.updateBook(id, updatedData);
        if (updatedBook) {
            res.status(200).json({
                message: "Book updated",
                data: updatedBook,
            });
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating book" });
    }
};

export const deleteBook = (req: Request, res: Response): void => {
    try {
        const { id } = req.params;
        const success = bookService.deleteBook(id);
        if (success) {
            res.status(200).json({ message: "Book deleted" });
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting book" });
    }
};

export const borrowBook = (req: Request, res: Response): void => {
    try {
        const { id } = req.params;
        const borrowerId = req.body.borrowerId;
        const result = bookService.borrowBook(id, borrowerId);
        if (result) {
            res.status(200).json({ message: "Book borrowed", data: result });
        } else {
            res.status(404).json({
                message: "Book not found or already borrowed",
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Error borrowing book" });
    }
};

export const returnBook = (req: Request, res: Response): void => {
    try {
        const { id } = req.params;
        const result = bookService.returnBook(id);
        if (result) {
            res.status(200).json({ message: "Book returned" });
        } else {
            res.status(404).json({
                message: "Book not found or not currently borrowed",
            });
        }
    } catch (error) {
        res.status(500).json({ message: "Error returning book" });
    }
};

export const getRecommendations = (req: Request, res: Response): void => {
    try {
        const recommendations = bookService.getRecommendations();
        res.status(200).json({
            message: "Recommendations retrieved",
            data: recommendations,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching recommendations" });
    }
};