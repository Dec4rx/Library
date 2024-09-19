using Library.Server.Models;
using Library.Server.Models.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Library.Server.Repostories
{
    public class BookRepository : IBookRepository
    {
        private readonly LibraryDbContext _dbContext;

        public BookRepository(LibraryDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        public async Task<ActionResult> AddAsync(Book book)
        {
            if (book == null)
            {
                return new BadRequestResult();
            }
            var errors = new Dictionary<string, List<string>>();
            // Check if the ISBN already exists in the database
            var existingBook = await _dbContext.Books.FirstOrDefaultAsync(b => b.Isbn == book.Isbn);
            if (existingBook != null)
            {
                errors["Isbn"] = new List<string> { "The book with the same ISBN already exists in the database" };
                return new BadRequestObjectResult(new { errors });
            }

            _dbContext.Books.Add(book);
            await _dbContext.SaveChangesAsync();
            return new StatusCodeResult(201);
        }


        public async Task<ActionResult> DeleteAsync(int id)
        {
            var book = await _dbContext.Books.FindAsync(id);
            if (book == null)
            {
                return new NotFoundResult();
            }

            _dbContext.Books.Remove(book);
            await _dbContext.SaveChangesAsync();
            return new OkResult();
        }

        public async Task<ActionResult<IEnumerable<Book>>> GetAllAsync()
        {
            var books = await _dbContext.Books.ToListAsync();
            return new ActionResult<IEnumerable<Book>>(books);
        }

        public async Task<ActionResult<Book>> GetByIdAsync(int id)
        {
            var book = await _dbContext.Books.FindAsync(id);
            if (book == null)
            {
                return new NotFoundResult();
            }

            return new ActionResult<Book>(book);
        }

        public async Task<ActionResult<Book>> UpdateAsync(int id, BookDTO bookDTO)
        {
            if (bookDTO == null)
            {
                return new BadRequestResult();
            }

            var book = await _dbContext.Books.FindAsync(id);

            if (book.Isbn != bookDTO.Isbn && !string.IsNullOrWhiteSpace(bookDTO.Isbn))
            {
                var errors = new Dictionary<string, List<string>>();
                // Check if the ISBN already exists in the database
                var existingBook = await _dbContext.Books.FirstOrDefaultAsync(b => b.Isbn == bookDTO.Isbn);
               
                if (existingBook != null)
                {
                    
                    errors["Isbn"] = new List<string> { "The book with the same ISBN already exists in the database" };
                    return new BadRequestObjectResult(new { errors });
                }

            }

            
            if (!string.IsNullOrWhiteSpace(bookDTO.Isbn))
            {
                book.Isbn = bookDTO.Isbn;
            }
            if (!string.IsNullOrWhiteSpace(bookDTO.Title))
            {
                book.Title = bookDTO.Title;
            }
            if (!string.IsNullOrWhiteSpace(bookDTO.Author))
            {
                book.Author = bookDTO.Author;
            }
            if (!string.IsNullOrWhiteSpace(bookDTO.Genre))
            {
                book.Genre = bookDTO.Genre;
            }
            if (bookDTO.Year.HasValue)
            {
                book.Year = bookDTO.Year.Value;
            }
            if (!string.IsNullOrWhiteSpace(bookDTO.Description))
            {
                book.Description = bookDTO.Description;
            }
            if (bookDTO.Pages.HasValue)
            {
                book.Pages = bookDTO.Pages.Value;
            }

            await _dbContext.SaveChangesAsync();
            
            return new ActionResult<Book>(book);
        }
    }
}
