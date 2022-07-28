using Advertisement_Api.Interfaces;
using Advertisement_Api.Models;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Advertisement_Api.Controllers
{    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AdvertisementsController : ControllerBase
    {
        private readonly IAdvertisementRepository _advertisementRepository;
        private readonly IMapper _mapper;

        public AdvertisementsController(IAdvertisementRepository advertisementRepository, IMapper mapper)
        {
            _advertisementRepository = advertisementRepository;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("/api/get")]
        
        public IActionResult GetAdvertisements()
        {

            return Ok(_advertisementRepository.GetAll().ProjectTo<AdvertisementDTO>(_mapper.ConfigurationProvider).ToList());
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult GetAdvertisement(int id)
        {
            var advertisement = _advertisementRepository.GetById(id);
            if (advertisement == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<AdvertisementDTO>(advertisement));
        }

        [AllowAnonymous]
        [HttpPut("{id}")]

        public IActionResult PutAdvertisement(int id, Advertisement advertisement)
        {

            if (id != advertisement.Id)
            {
                return BadRequest();
            }

            try
            {
                _advertisementRepository.Update(advertisement);
            }
            catch
            {
                return BadRequest();
            }

            return Ok(_mapper.Map < AdvertisementDetail > (advertisement));
        }

        [HttpPost]
        [Route("/api/add/")]
        public IActionResult PostAdvertisement(Advertisement advertisement)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _advertisementRepository.Add(advertisement);
            return CreatedAtAction("GetAdvertisement", new { id = advertisement.Id }, advertisement);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteAdvertisement(int id)
        {
            var advertisement = _advertisementRepository.GetById(id);
            if (advertisement == null)
            {
                return NotFound();
            }

            _advertisementRepository.Delete(advertisement);
            return NoContent();
        }

        [HttpPost]
        [Route("/api/search")]
        public IActionResult Search(AdvertisementMinMaxDTO dto)
        {
            if (dto.Minimum < 0 || dto.Maximum < 0 || dto.Minimum > dto.Maximum)
            {
                return BadRequest();
            }
            return Ok(_advertisementRepository.GetAllByParameters(dto.Minimum, dto.Maximum).ProjectTo<AdvertisementDetail>(_mapper.ConfigurationProvider).ToList());
        }

    }
}
