import React, { useState, useEffect } from 'react';
import { Book } from '../types/Books';
import EditBook from './EditBook';
import AddBook from './AddBook';
import Modal from './Modal'; // Asegúrate de importar el componente Modal
import FullBook from './FullBook';

const Home: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [selectedFullBook, setSelectedFullBook] = useState<Book | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isSeeMoreModalOpen, setIsSeeMoreModalOpen] = useState(false);
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

    const handleOnSeeMore = (book: Book) => {
        setSelectedFullBook(book);
        setIsSeeMoreModalOpen(true);
    }

    if (isLoading) {
        return (
            <div className="spinner-overlay">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div>
            <button onClick={() => setIsAddModalOpen(true)} className="primary">
                <i className="fa-solid fa-circle-plus" style={{ marginRight: '8px', fontSize: '1.5em' }}></i>
                Add Book
            </button>

            <Modal isOpen={isSeeMoreModalOpen} onClose={() => setIsSeeMoreModalOpen(false)}>
                { selectedFullBook && <FullBook book={selectedFullBook} /> }
            </Modal>

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
                        <th>ISBN</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.isbn}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.description}</td>
                            <td>
                                <button onClick={() => handleOnSeeMore(book)} className="secondary"> {/*TODO more info  */}
                                    <i className="fa-solid fa-info-circle" style={{ marginRight: '8px', fontSize: '1.5em' }}></i>
                                    More...
                                </button>
                                <button onClick={() => handleSelectBook(book)} className="primary">
                                    <i className="fa-solid fa-pen-to-square" style={{ marginRight: '8px', fontSize: '1.5em' }}></i>
                                    Edit
                                </button>
                                <button onClick={() => handleDeleteBook(book.id)} className="secondary">
                                    <i className="fa-solid fa-trash-can" style={{ marginRight: '8px', fontSize: '1.5em' }}></i>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;
