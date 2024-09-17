import { Book } from '../types/Books';

interface EditBookProps {
    handleGetBooks: () => Promise<void>;
    bookState: [Book | null, React.Dispatch<React.SetStateAction<Book | null>>];
}


const EditBook: React.FC<EditBookProps> = ({ handleGetBooks, bookState }) => {
    const [book, setBook] = bookState;
    const handleUpdateBook = async (book: Book) => {
        try {
            const response = await fetch(`api/book/${book.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(`Updated book with id: ${book.id}`);
            handleGetBooks(); // Refresh the book list
        } catch (err) {
            console.error('Failed to update book', err);
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
                        value={book?.isbn}
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
