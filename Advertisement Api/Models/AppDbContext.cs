using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Advertisement_Api.Models
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Agency> Agencies { get; set; }
        public DbSet<Advertisement> Advertisements { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Agency>().HasData(
                new Agency() { Id = 1, Name = "Naj Nekretnine", YearOfEstablishment = 2005 },
                new Agency() { Id = 2, Name = "Dupleks Nekretnine", YearOfEstablishment = 2010 },
                new Agency() { Id = 3, Name = "Fast Nekretnine", YearOfEstablishment = 2005 }
            );
            modelBuilder.Entity<Advertisement>().HasData(
                new Advertisement() { Id = 1, Title = "Komforna kuca", Type = "Kuca", ConstructionYear = 1987, Price = 110000, AgencyId = 3 },
                new Advertisement() { Id = 2, Title = "Stan na ekstra lokaciji", Type = "Stan", ConstructionYear = 1979, Price = 80000, AgencyId = 1 },
                new Advertisement() { Id = 3, Title = "Moderan Duplex", Type = "Duplex stan", ConstructionYear = 2020, Price = 220000, AgencyId = 2 },
                new Advertisement() { Id = 4, Title = " Povoljna vikendica", Type = "Vikendica", ConstructionYear = 1971, Price = 50000, AgencyId = 3 },
                new Advertisement() { Id = 5, Title = "Stan u sirem centru", Type = "Stan", ConstructionYear = 1955, Price = 90000, AgencyId = 1 }
                );
            base.OnModelCreating(modelBuilder);
        }

    }    
}
