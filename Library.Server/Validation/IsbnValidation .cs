using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;

namespace Library.Server.Validation
{
    public class IsbnValidation : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            string isbn = value as string;

            // If ISBN is empty, do not validate
            if (string.IsNullOrEmpty(isbn))
            {
                return ValidationResult.Success;
            }

            // Validate ISBN-10
            if (isbn.Length == 10 && IsValidIsbn10(isbn))
            {
                return ValidationResult.Success;
            }

            // Validate ISBN-13
            if (isbn.Length == 13 && IsValidIsbn13(isbn))
            {
                return ValidationResult.Success;
            }

            // If it is neither a valid ISBN-10 nor ISBN-13, fail
            return new ValidationResult("ISBN must be a valid ISBN-10 or ISBN-13.");
        }

        private bool IsValidIsbn10(string isbn)
        {
            // Validate if the ISBN-10 has the first 9 numeric digits and the last numeric digit or 'X'
            if (!Regex.IsMatch(isbn, @"^\d{9}[\dXx]$"))
            {
                return false;
            }

            // Calculate the check digit for ISBN-10
            int sum = 0;
            for (int i = 0; i < 9; i++)
            {
                sum += (i + 1) * (isbn[i] - '0');
            }

            char checksum = isbn[9];
            if (checksum == 'X' || checksum == 'x')
            {
                sum += 10 * 10;
            }
            else
            {
                sum += 10 * (checksum - '0');
            }

            return sum % 11 == 0;
        }

        private bool IsValidIsbn13(string isbn)
        {
            // Validate if the ISBN-13 has 13 numeric digits
            if (!Regex.IsMatch(isbn, @"^\d{13}$"))
            {
                return false;
            }

            // Calculate the check digit for ISBN-13
            int sum = 0;
            for (int i = 0; i < 12; i++)
            {
                int digit = isbn[i] - '0';
                sum += (i % 2 == 0) ? digit : digit * 3;
            }

            int checksum = (10 - (sum % 10)) % 10;
            return checksum == (isbn[12] - '0');
        }

    }
}
