using Advertisement_Api.Interfaces;
using Advertisement_Api.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Advertisement_Api.Repository
{
    public class AgencyRepository : IAgencyRepository
    {
        private readonly AppDbContext _context;

        public AgencyRepository(AppDbContext context)
        {
            _context = context;
        }

        public IQueryable<Agency> GetAll()
        {
            return _context.Agencies.OrderBy(a => a.Name);
        }
        public Agency GetById(int id)
        {
            return _context.Agencies.FirstOrDefault(a => a.Id == id);
        }

        public void Add(Agency agency)
        {
            _context.Agencies.Add(agency);
            _context.SaveChanges();
        }

        public Agency GetOne(int id)
        {
            return _context.Agencies.FirstOrDefault(f => f.Id == id);
        }


        public void Update(Agency Agency)
        {
            _context.Entry(Agency).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
        }

        public void Delete(Agency agency)
        {
            _context.Agencies.Remove(agency);
            _context.SaveChanges();
        }

    }
}
