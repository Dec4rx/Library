import React, { useState, useEffect } from 'react';
import { Book } from '../types/Books';
import EditBook from './EditBook';
import AddBook from './AddBook';
import Modal from './Modal'; // Asegúrate de importar el componente Modal

const Home: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [isAddingBook, setIsAddingBook] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleGetBooks = async () => {
        try {
            const response = await fetch('api/book');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result: Book[] = await response.json();
            setBooks(result);
        } catch (err) {
            console.error('Failed to fetch books', err);
        } finally {
            setIsLoading(false);
        }
    };

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
            handleGetBooks(); // Refresh the book list
        } catch (err) {
            console.error('Failed to delete book', err);
        }
    };

    const handleSelectBook = (book: Book) => {
        setSelectedBook(book);
        setIsEditModalOpen(true);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <button onClick={() => setIsAddModalOpen(true)} className="primary">Add Book</button>

            <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
                {selectedBook && <EditBook handleGetBooks={handleGetBooks} bookState={[selectedBook, setSelectedBook]} />}
            </Modal>

            <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
                <AddBook handleGetBooks={handleGetBooks} />
            </Modal>

            <br />
            
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
                                <button onClick={() => handleSelectBook(book)} className="primary">Edit</button>
                                <button onClick={() => handleDeleteBook(book.id)} className="secondary">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
