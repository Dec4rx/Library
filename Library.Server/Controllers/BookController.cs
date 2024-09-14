using Library.Server.Models;
using Library.Server.Models.DTOs;
using Library.Server.Repostories;
using Microsoft.AspNetCore.Mvc;

namespace Library.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly IBookRepository _bookRepository;

        public BookController(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Book>>> GetBooks()
        {
            return await _bookRepository.GetAllAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook([FromRoute] int id)
        {
            return await _bookRepository.GetByIdAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult<Book>> PostBook([FromBody] Book book)
        {
            return await _bookRepository.AddAsync(book);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Book>> PutBook([FromRoute] int id, [FromBody] BookDTO bookDTO)
        {
            return await _bookRepository.UpdateAsync(id, bookDTO);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook([FromRoute] int id)
        {
            return await _bookRepository.DeleteAsync(id);
        }
    }
}
