using Microsoft.EntityFrameworkCore;
using BackendApi.Models;

namespace BackendApi.DbContexts
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Rate> Rates { get; set; }
   
    }
}