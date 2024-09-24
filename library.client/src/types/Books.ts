export interface Book {
    id: number;
    isbn: string;
    genre: string;
    title: string;
    author: string;
    year: number;
    description: string;
    pages: number;
}

export type BookInput = Omit<Book, 'id'>;
