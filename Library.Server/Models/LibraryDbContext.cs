using Microsoft.EntityFrameworkCore;

namespace Library.Server.Models
{
    public class LibraryDbContext : DbContext
    {
        public LibraryDbContext(DbContextOptions<LibraryDbContext> options) : base(options)
        {
        }

        /// <summary>
        /// This method is called when the model for a derived context has been initialized, but before the model has been locked down and used to initialize the context.
        /// It is used to configure the model of the database.
        /// </summary>
        /// <param name="modelBuilder">The builder being used to construct the model for the database.</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Book>()
                .HasIndex(b => b.Isbn)
                .IsUnique();
        }


        public DbSet<Book> Books { get; set; }
    }
}
