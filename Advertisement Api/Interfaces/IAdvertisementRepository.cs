using Advertisement_Api.Models;
using System.Linq;

namespace Advertisement_Api.Interfaces
{
    public interface IAdvertisementRepository
    {
        IQueryable<Advertisement> GetAll();
        Advertisement GetById(int id);
        void Add(Advertisement advertisement);
        void Update(Advertisement advertisement);
        void Delete(Advertisement advertisement);
        IQueryable<Advertisement> GetAllByParameters(int minimum, int maximum);
       
    }
}
