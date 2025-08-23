"use strict";
// 15. Create a Library class that can store Book and User objects. Add method to add books.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Library = void 0;
class Library {
    constructor() {
        this.books = [];
        this.users = [];
    }
    addBook(book) {
        this.books.push(book);
    }
    addUser(user) {
        this.users.push(user);
    }
    getBooks() {
        return this.books;
    }
    getUsers() {
        return this.users;
    }
}
exports.Library = Library;
