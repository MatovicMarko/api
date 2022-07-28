using Advertisement_Api.Models;
using System.Linq;

namespace Advertisement_Api.Interfaces
{
    public interface IAgencyRepository
    {
        IQueryable<Agency> GetAll();
        Agency GetById(int id);
        Agency GetOne(int id);
        void Add(Agency agency);
        void Update(Agency agency);
        void Delete(Agency id);
    }
}
