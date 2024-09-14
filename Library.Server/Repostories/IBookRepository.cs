using Library.Server.Models;
using Library.Server.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Library.Server.Repostories
{
    public interface IBookRepository
    {
        Task <ActionResult<IEnumerable<Book>>> GetAllAsync();
        Task <ActionResult<Book>> GetByIdAsync(int id);
        Task <ActionResult> AddAsync(Book book);
        Task <ActionResult<Book>> UpdateAsync(int id, BookDTO bookDTO);
        Task <ActionResult> DeleteAsync(int id);
    }
}
