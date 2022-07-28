using Advertisement_Api.Interfaces;
using Advertisement_Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Advertisement_Api.Repository
{
    public class AdvertisementRepository : IAdvertisementRepository
    {
        private readonly AppDbContext _context;

        public AdvertisementRepository(AppDbContext context)
        {
            this._context = context;
        }

        public IQueryable<Advertisement> GetAll()
        {
            return _context.Advertisements.Include(a => a.Agency).OrderByDescending(c => c.ConstructionYear);
        }

        public Advertisement GetById(int id)
        {
            return _context.Advertisements.Include(c => c.Agency).FirstOrDefault(p => p.Id == id);
        }

        public void Add(Advertisement advertisement)
        {
            _context.Advertisements.Add(advertisement);
            _context.SaveChanges();
        }

        public void Update(Advertisement advertisement)
        {
            _context.Entry(advertisement).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
        }

        public void Delete(Advertisement advertisement)
        {
            _context.Advertisements.Remove(advertisement);
            _context.SaveChanges();
        }

        public IQueryable<Advertisement> GetAllByParameters(int minimum, int maximum)
        {
            return _context.Advertisements.Include(c => c.Agency).Where(c => c.Price >= minimum && c.Price <= maximum).OrderBy(c=>c.Price);
        }

       
    }
}
