import { BookInput } from '../types/Books';
import { useState } from 'react';
import Modal from './Modal';
import { toast, ToastContainer } from 'react-toastify';

interface AddBookProps {
    handleGetBooks: () => Promise<void>;
}

const AddBook: React.FC<AddBookProps> = ({ handleGetBooks }) => {
    const [book, setBook] = useState<BookInput>();
    const [errors, setErrors] = useState<any>({});
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

    const handleAddBook = async (book: BookInput) => {
        setErrors({});
        try {
            const response = await fetch('api/book', {
                method: 'POST',
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
                throw new Error(`Network response was not ok. Status: ${await response.json()}`);
            }
            toast.success('Book added successfully!'); // Show success message
            handleGetBooks(); // Refresh the book list
        } catch (err) {
            console.error('Failed to add book', err);
            toast.error('Failed to add book. Please try again.'); // Show error message
        }
    };

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (book) {
                        handleAddBook(book);
                    }
                }}
            >
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
                        value={book?.isbn} // Add !! '' to avoid undefined error
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
                <button type="submit" className="primary">Add</button>
            </form>
        </div>
    );
};

export default AddBook;
