import React, { useState, useEffect } from 'react';
import { Book, BookInput } from '../types/Books';
import EditBook from './EditBook';
import AddBook from './AddBook';

const Home: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [addingBook, setAddingBook] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleGetBooks = async () => {
        try {
            const response = await fetch('api/book');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result: Book[] = await response.json();
            console.log('Fetched books:', result); // Verifica la respuesta
            setBooks(result);
        } catch (err) {
            console.error('Failed to fetch books', err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleGetBooks();
    }, []);


    const handleDeleteBook = async (id: number) => {
        try {
            const response = await fetch(`api/book/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(`Deleted book with id: ${id}`);
            handleGetBooks(); // Refresh the book list
        } catch (err) {
            console.error('Failed to deleting books', err);
        }
    };

    const handleSelectBook = (book: Book) => {
        setSelectedBook(book);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <h2>Book List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ISBN</th>
                            <th>Genre</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Year</th>
                            <th>Description</th>
                            <th>Pages</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.id}>
                                <td>{book.id}</td>
                                <td>{book.isbn}</td>
                                <td>{book.genre}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.year}</td>
                                <td>{book.description}</td>
                                <td>{book.pages}</td>
                                <td>
                                    <button onClick={() => handleSelectBook(book)}>Edit</button>
                                    <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>

                {/* <h2>{selectedBook && addingBook ? 'Edit Book' : 'Add Book'}</h2> */}
                <h2>Edit Book</h2>
                <EditBook handleGetBooks={handleGetBooks} bookState={[selectedBook, setSelectedBook]} />
                {/* {!addingBook ? <button onClick={() => setAddingBook(!addingBook)}>+</button> : <></>} */}

                <h2>Add Book</h2>
                <AddBook handleGetBooks={handleGetBooks} />
                {/* {selectedBook && addingBook ? 
                <EditBook handleGetBooks={handleGetBooks} bookState={[selectedBook, setSelectedBook]} /> : 
                addingBook && <AddBook handleGetBooks={handleGetBooks} />} */}

                
            </div>
        </div>
    );
};

export default Home;