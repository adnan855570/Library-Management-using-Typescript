// Define the Book interface to specify the structure of a book object
interface Book {
    id: string;        // Unique identifier for each book
    name: string;      // Name of the book
    author: string;    // Author of the book
    edition: string;   // Edition of the book
}

// Main class that handles the library management operations
class LibraryApp {
    private books: Book[] = []; // Array to hold the list of book records

    // Constructor that initializes the app by binding events and rendering existing books
    constructor() {
        this.bindEvents();   // Bind all event listeners to form actions
        this.renderBooks();  // Render the initial list of books (if any)
    }

    // Binds event listeners to the corresponding form actions for CRUD operations
    private bindEvents(): void {
        // Bind 'Add Book' form submission to addBook method
        document.getElementById('addBookForm')?.addEventListener('submit', this.addBook.bind(this));
        // Bind 'Update Book' form submission to updateBook method
        document.getElementById('updateBookForm')?.addEventListener('submit', this.updateBook.bind(this));
        // Bind 'Search Book' form submission to searchBook method
        document.getElementById('searchBookForm')?.addEventListener('submit', this.searchBook.bind(this));
        // Bind 'Delete Book' form submission to deleteBook method
        document.getElementById('deleteBookForm')?.addEventListener('submit', this.deleteBook.bind(this));
    }

    // Handles the addition of a new book to the library
    private addBook(event: Event): void {
        event.preventDefault();  // Prevent the form from submitting and refreshing the page
        
        // Get input values from the form
        const id = (document.getElementById('addBookId') as HTMLInputElement).value;
        const name = (document.getElementById('addBookName') as HTMLInputElement).value;
        const author = (document.getElementById('addBookAuthor') as HTMLInputElement).value;
        const edition = (document.getElementById('addBookEdition') as HTMLInputElement).value;

        // Check if a book with the same ID or name already exists
        if (this.books.find(book => book.id === id || book.name === name)) {
            alert('Book with the same ID or name already exists.');
            return;
        }

        // Add the new book to the array
        this.books.push({ id, name, author, edition });
        this.renderBooks();            // Re-render the list of books to show the new addition
        this.clearForm('addBookForm'); // Clear the form inputs
    }

    // Handles updating an existing book's information
    private updateBook(event: Event): void {
        event.preventDefault(); // Prevent the form from submitting and refreshing the page

        // Get input values from the form
        const id = (document.getElementById('updateBookId') as HTMLInputElement).value;
        const name = (document.getElementById('updateBookName') as HTMLInputElement).value;
        const author = (document.getElementById('updateBookAuthor') as HTMLInputElement).value;
        const edition = (document.getElementById('updateBookEdition') as HTMLInputElement).value;

        // Find the book by its ID
        const book = this.books.find(book => book.id === id);
        if (!book) {
            alert('Book not found.');  // Alert if the book is not found
            return;
        }

        // Update the book's details if new values are provided
        book.name = name || book.name;
        book.author = author || book.author;
        book.edition = edition || book.edition;
        this.renderBooks();              // Re-render the list of books to show the updated information
        this.clearForm('updateBookForm'); // Clear the form inputs
    }

    // Handles searching for a book by its name and displaying the details
    private searchBook(event: Event): void {
        event.preventDefault(); // Prevent the form from submitting and refreshing the page

        // Get the name input value from the form
        const name = (document.getElementById('searchBookName') as HTMLInputElement).value;
        // Find the book by its name
        const book = this.books.find(book => book.name === name);

        if (book) {
            // Display the found book's author and edition in the respective spans
            (document.getElementById('searchAuthor') as HTMLElement).textContent = book.author;
            (document.getElementById('searchEdition') as HTMLElement).textContent = book.edition;
        } else {
            // Alert if the book is not found and clear the displayed details
            alert('Book not found.');
            (document.getElementById('searchAuthor') as HTMLElement).textContent = '';
            (document.getElementById('searchEdition') as HTMLElement).textContent = '';
        }
    }

    // Handles deleting a book from the library by its name
    private deleteBook(event: Event): void {
        event.preventDefault(); // Prevent the form from submitting and refreshing the page

        // Get the name input value from the form
        const name = (document.getElementById('deleteBookName') as HTMLInputElement).value;
        // Filter out the book to be deleted
        this.books = this.books.filter(book => book.name !== name);
        this.renderBooks();             // Re-render the list of books after deletion
        this.clearForm('deleteBookForm'); // Clear the form inputs
    }

    // Renders the list of books on the page by updating the DOM
    private renderBooks(): void {
        const list = document.getElementById('bookList') as HTMLUListElement; // Get the book list element
        list.innerHTML = '';  // Clear the current list
        // Loop through each book and create a list item to display its details
        this.books.forEach(book => {
            const li = document.createElement('li'); // Create a new list item
            li.textContent = `${book.id} ${book.name} ${book.author} ${book.edition}`; // Set the text content
            list.appendChild(li); // Append the list item to the list
        });
    }

    // Clears the input fields of the specified form
    private clearForm(formId: string): void {
        const form = document.getElementById(formId) as HTMLFormElement; // Get the form element by ID
        form.reset(); // Reset the form to clear all inputs
    }
}

// Initialize the LibraryApp when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new LibraryApp(); // Create a new instance of the LibraryApp class
});
