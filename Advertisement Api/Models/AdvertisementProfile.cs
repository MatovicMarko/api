using AutoMapper;

namespace Advertisement_Api.Models
{
    public class AdvertisementProfile : Profile
    {
        public AdvertisementProfile()
        {
            CreateMap<Advertisement, AdvertisementDTO>();
            CreateMap<Advertisement, AdvertisementDetail>();
        }
    }
}
