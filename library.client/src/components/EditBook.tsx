import { useState } from 'react';
import { Book } from '../types/Books';
import Modal from './Modal';
import { toast, ToastContainer } from 'react-toastify';

interface EditBookProps {
    handleGetBooks: () => Promise<void>;
    bookState: [Book | null, React.Dispatch<React.SetStateAction<Book | null>>];
}

const EditBook: React.FC<EditBookProps> = ({ handleGetBooks, bookState }) => {
    const [book, setBook] = bookState;
    const [errors, setErrors] = useState<any>({});
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

    const handleUpdateBook = async (book: Book) => {
        setErrors({});
        try {
            const response = await fetch(`api/book/${book.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
            });

            if (!response.ok) {
                const responseData = await response.json();
                if (responseData.errors) {
                    console.log(responseData.errors);
                    setErrors(responseData.errors);
                    setIsAddModalOpen(true);
                }
                throw new Error(`Network response was not ok. Status: ${response.status}`);
            }
            toast.success('Book updated successfully!'); // Show success message
            handleGetBooks(); // Refresh the book list
        } catch (err) {
            console.error('Failed to update book', err);
            toast.error('Failed to update book. Please try again.'); // Show error message
        }
    };

    return (
        <div>
            <ToastContainer
                className="toast-container-custom"
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (book) {
                        handleUpdateBook(book);
                    }
                }}
            >
                <h1>Editing Book</h1>
                <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
                    <div className="error-messages">
                        {Object.entries(errors).map(([field, errorMessages]) => (
                            <div key={field}>
                                <strong>{field}:</strong> {(errorMessages as string[]).join(', ')}
                            </div>
                        ))}
                    </div>
                </Modal>
                <label>
                    Title:
                    <input
                        type="text"
                        placeholder="Title"
                        min={3}
                        max={50}
                        value={book?.title}
                        onChange={(e) => setBook({ ...book!, title: e.target.value })}
                    />
                </label>
                <label>
                    Author:
                    <input
                        type="text"
                        placeholder="Author"
                        min={3}
                        max={100}
                        value={book?.author}
                        onChange={(e) => setBook({ ...book!, author: e.target.value })}
                    />
                </label>
                <label>
                    Isbn:
                    <input
                        type="text"
                        placeholder="Isbn"
                        min={10}
                        max={13}
                        value={book?.isbn || ''}
                        onChange={(e) => setBook({ ...book!, isbn: e.target.value })}
                    />
                </label>
                <label>
                    Genre:
                    <input
                        type="text"
                        placeholder="Genre"
                        min={3}
                        max={50}
                        value={book?.genre}
                        onChange={(e) => setBook({ ...book!, genre: e.target.value })}
                    />
                </label>
                <label>
                    Year:
                    <input
                        type="number"
                        placeholder="Year"
                        min={1}
                        max={new Date().getFullYear()}
                        value={book?.year}
                        onChange={(e) => setBook({ ...book!, year: Number(e.target.value) })}
                    />
                </label>
                <label>
                    Description:
                    <textarea
                        placeholder="Description"
                        minLength={10}
                        value={book?.description}
                        onChange={(e) => setBook({ ...book!, description: e.target.value })}
                    />
                </label>
                <label>
                    Pages:
                    <input
                        type="number"
                        placeholder="Pages"
                        value={book?.pages}
                        min={1}
                        onChange={(e) => setBook({ ...book!, pages: Number(e.target.value) })}
                    />
                </label>
                <button type="submit" className="primary">Update</button>
            </form>
        </div>
    );
};

export default EditBook;
