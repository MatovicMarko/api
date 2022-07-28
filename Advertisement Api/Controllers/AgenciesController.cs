using Advertisement_Api.Interfaces;
using Advertisement_Api.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Advertisement_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AgenciesController : ControllerBase
    {
        private readonly IAgencyRepository _agencyRepository;
        
        public AgenciesController(IAgencyRepository agencyRepository)
        {
            _agencyRepository = agencyRepository;
            
        }
        [HttpGet]
        public IActionResult GetAgencies()
        {
            return Ok(_agencyRepository.GetAll().ToList());
        }

        
        [AllowAnonymous]
        [HttpPut]
        [Route("/api/update")]
        public IActionResult UpdateAgency(int id, Agency agency)
        {
            if (id!= agency.Id)
            {
                return BadRequest();
            }

            try
            {
                _agencyRepository.Update(agency);
            }
            catch
            {
                return BadRequest();
            }

            return Ok(agency);
        }
       
       
        [HttpDelete]
        public IActionResult DeleteAgency(int id)
        {
            var agency = _agencyRepository.GetById(id);
            if (agency == null)
            {
                return NotFound();
            }

            _agencyRepository.Delete(agency);
            return NoContent();
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult GetOne(int id)
        {
            Agency agency = _agencyRepository.GetOne(id);
            if (agency == null)
            {
                return NotFound();
            }

            return Ok(agency);
        }
        [AllowAnonymous]
        [HttpPost]
        public IActionResult Add(Agency agency)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _agencyRepository.Add(agency);

            return CreatedAtAction("GetOne", new { id = agency.Id }, agency);
        }
    }
}
