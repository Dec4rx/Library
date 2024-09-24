import React from 'react';
import { Book } from '../types/Books';

interface BookProps {
    book: Book;
}

const FullBook: React.FC<BookProps> = ({ book }) => {
    return (
        <div className='full-book'>
                <h1>{book.title}</h1>
                <strong>Author:</strong>
                <p>{book.author}</p>
                <strong>Summary:</strong>
                <p>{book.description}</p>
                <strong>Genre:</strong>
                <p>{book.genre}</p>
                <strong>Pages:</strong>
                <p>{book.pages}</p>
                <strong>Published Date:</strong>
                <p>{book.year}</p>
                <strong>ISBN:</strong>
                <p>{book.isbn}</p>
            
        </div>
    );
};

export default FullBook;