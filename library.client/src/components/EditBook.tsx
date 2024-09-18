import { useState } from 'react';
import { Book } from '../types/Books';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface EditBookProps {
    handleGetBooks: () => Promise<void>;
    bookState: [Book | null, React.Dispatch<React.SetStateAction<Book | null>>];
}

const EditBook: React.FC<EditBookProps> = ({ handleGetBooks, bookState }) => {
    const [book, setBook] = bookState;
    const [errors, setErrors] = useState<any>({});

    // Validación en el lado del cliente para mostrar errores inmediatos
    const validateBook = (book: Book) => {
        const newErrors: any = {};

        if (!book.title || book.title.length < 3) newErrors.title = 'Title must be at least 3 characters long';
        if (!book.author || book.author.length < 3) newErrors.author = 'Author must be at least 3 characters long';
        if (!book.isbn || book.isbn.length < 10 || book.isbn.length > 13) newErrors.isbn = 'ISBN must be between 10 and 13 characters long';
        if (!book.genre || book.genre.length < 3) newErrors.genre = 'Genre must be at least 3 characters long';
        if (book.year < 1 || book.year > new Date().getFullYear()) newErrors.year = 'Year must be between 1 and the current year';
        if (!book.description || book.description.length < 10) newErrors.description = 'Description must be at least 10 characters long';
        if (book.pages < 1) newErrors.pages = 'Pages must be a positive number';

        return newErrors;
    };

    const handleUpdateBook = async (book: Book) => {
        // Limpia los errores anteriores antes de enviar el formulario
        setErrors({});

        // Realiza la validación del lado del cliente
        const validationErrors = validateBook(book);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; // Exit early if there are validation errors
        }

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
                    setErrors(responseData.errors);
                    return; // Display errors but do not proceed with success message
                }
                throw new Error(`Network response was not ok. Status: ${response.status}`);
            }

            // Actualización exitosa
            await handleGetBooks(); // Refresh the book list
            toast.success('Book updated successfully!'); // Show success message
        } catch (err) {
            console.error('Failed to update book', err);
            toast.error('Failed to update book. Please try again.'); // Show error message
        }
    };

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (book) {
                        handleUpdateBook(book);
                    }
                }}
            >
                <label className={errors.title ? 'error-label' : ''}>
                    Title:
                    <input
                        type="text"
                        placeholder="Title"
                        minLength={3}
                        maxLength={50}
                        value={book?.title || ''}
                        onChange={(e) => setBook({ ...book!, title: e.target.value })}
                        required
                    />
                    {errors.title && <p className="error">{errors.title}</p>}
                </label>

                <label className={errors.author ? 'error-label' : ''}>
                    Author:
                    <input
                        type="text"
                        placeholder="Author"
                        minLength={3}
                        maxLength={100}
                        value={book?.author || ''}
                        onChange={(e) => setBook({ ...book!, author: e.target.value })}
                        required
                    />
                    {errors.author && <p className="error">{errors.author}</p>}
                </label>

                <label className={errors.isbn ? 'error-label' : ''}>
                    Isbn:
                    <input
                        type="text"
                        placeholder="Isbn"
                        minLength={10}
                        maxLength={13}
                        value={book?.isbn || ''}
                        onChange={(e) => setBook({ ...book!, isbn: e.target.value })}
                        required
                    />
                    {errors.isbn && <p className="error">{errors.isbn}</p>}
                </label>

                <label className={errors.genre ? 'error-label' : ''}>
                    Genre:
                    <input
                        type="text"
                        placeholder="Genre"
                        minLength={3}
                        maxLength={50}
                        value={book?.genre || ''}
                        onChange={(e) => setBook({ ...book!, genre: e.target.value })}
                        required
                    />
                    {errors.genre && <p className="error">{errors.genre}</p>}
                </label>

                <label className={errors.year ? 'error-label' : ''}>
                    Year:
                    <input
                        type="number"
                        placeholder="Year"
                        min={1}
                        max={new Date().getFullYear()}
                        value={book?.year || ''}
                        onChange={(e) => setBook({ ...book!, year: Number(e.target.value) })}
                        required
                    />
                    {errors.year && <p className="error">{errors.year}</p>}
                </label>

                <label className={errors.description ? 'error-label' : ''}>
                    Description:
                    <textarea
                        placeholder="Description"
                        minLength={10}
                        value={book?.description || ''}
                        onChange={(e) => setBook({ ...book!, description: e.target.value })}
                        required
                    />
                    {errors.description && <p className="error">{errors.description}</p>}
                </label>

                <label className={errors.pages ? 'error-label' : ''}>
                    Pages:
                    <input
                        type="number"
                        placeholder="Pages"
                        value={book?.pages || ''}
                        min={1}
                        onChange={(e) => setBook({ ...book!, pages: Number(e.target.value) })}
                        required
                    />
                    {errors.pages && <p className="error">{errors.pages}</p>}
                </label>

                <button type="submit" className="primary">Update</button>
            </form>

            <ToastContainer
                className="toast-container-custom"
                position="top-right" // Puede ser cualquier posición, pero la clase CSS ajusta la ubicación
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

        </div>
    );
};

export default EditBook;
