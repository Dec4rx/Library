using System.ComponentModel.DataAnnotations;
using Library.Server.Validation;


namespace Library.Server.Models
{
    public class Book
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "ISBN is required")]
        [StringLength(13, ErrorMessage = "The ISBN must not exceed 13 characters")]
        [IsbnValidation(ErrorMessage = "ISBN must be a valid ISBN-10 or ISBN-13.")]
        public string Isbn { get; set; }

        [Required(ErrorMessage = "Genre is required")]
        [StringLength(50, ErrorMessage = "The Title must not exceed 50 characters")]
        [MinLength(3, ErrorMessage = "Genre must have at least 3 characters")]
        public string Genre { get; set; }

        [Required(ErrorMessage = "Title is required")]
        [StringLength(255, ErrorMessage = "The Title must not exceed 255 characters")]
        [MinLength(3, ErrorMessage = "Title must have at least 3 characters")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Author is required")]
        [StringLength(100, ErrorMessage = "The Author name must not exceed 100 characters")]
        [MinLength(3, ErrorMessage = "Author must have at least 3 characters")]
        public string Author { get; set; }

        [Required(ErrorMessage = "Year is required")]
        [Range(1, int.MaxValue, ErrorMessage = "Year must be a positive number")]
        public int Year { get; set; }

        [Required(ErrorMessage = "Description is required")]
        [MinLength(10, ErrorMessage = "Description must have at least 10 characters")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Number of Pages is required")]
        [Range(1, int.MaxValue, ErrorMessage = "Pages must be a positive number")]
        public int Pages { get; set; }

    }
}
