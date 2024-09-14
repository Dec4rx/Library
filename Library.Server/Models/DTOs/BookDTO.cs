using Library.Server.Validation;
using System.ComponentModel.DataAnnotations;

namespace Library.Server.Models.DTOs
{
    public class BookDTO
    {
        [StringLength(13, ErrorMessage = "The ISBN must not exceed 13 characters")]
        [IsbnValidation(ErrorMessage = "ISBN must be a valid ISBN-10 or ISBN-13.")]
        public string? Isbn { get; set; } 

        [StringLength(50, ErrorMessage = "The Genre must not exceed 50 characters")]
        [MinLength(3, ErrorMessage = "Genre must have at least 3 characters")]
        public string? Genre { get; set; } 

        [StringLength(255, ErrorMessage = "The Title must not exceed 255 characters")]
        [MinLength(3, ErrorMessage = "Title must have at least 3 characters")]
        public string? Title { get; set; } 

        [StringLength(100, ErrorMessage = "The Author name must not exceed 100 characters")]
        [MinLength(3, ErrorMessage = "Author must have at least 3 characters")]
        public string? Author { get; set; } 

        [Range(1, int.MaxValue, ErrorMessage = "Year must be a positive number")]
        public int? Year { get; set; } 

        [MinLength(10, ErrorMessage = "Description must have at least 10 characters")]
        public string? Description { get; set; } 

        [Range(1, int.MaxValue, ErrorMessage = "Pages must be a positive number")]
        public int? Pages { get; set; } 
    }
}
