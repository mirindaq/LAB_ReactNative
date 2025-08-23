// 15. Create a Library class that can store Book and User objects. Add method to add books.

import { Book } from "./Bai6";
import { User } from "./Bai7";

export class Library {
    private books: Book[] = [];
    private users: User[] = [];

    addBook(book: Book): void {
        this.books.push(book);
    }

    addUser(user: User): void {
        this.users.push(user);
    }

    getBooks(): Book[] {
        return this.books;
    }

    getUsers(): User[] {
        return this.users;
    }


}
