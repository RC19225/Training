using BackendApi.DbContexts;
using BackendApi.Dtos;
using BackendApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace BackendApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RateSourceController : ControllerBase
    {
        private readonly ILogger<RateSourceController> _logger;
        private readonly ApplicationDbContext _dbContext;

        public RateSourceController(ILogger<RateSourceController> logger, ApplicationDbContext dbContext)
        {
            _logger = logger;
            _dbContext = dbContext;
        }

        // GET: api/ratesource
        [HttpGet]
        public  async Task<IActionResult> GetAllRateSources()
        {
            try
            {
                // TODO: Implement repository/service call
                var rateSources = await _dbContext.Rates.ToListAsync();
                var rateDtos = rateSources.Select(rateMapper.toRateDto);
                return Ok(rateDtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving rate sources");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{geocode}")]
        public async Task<IActionResult> GetRateSourceByGeocode(string geocode)
        {
            try
            {
                // TODO: Implement repository/service call
                var rateSource = await _dbContext.Rates
                    .FirstOrDefaultAsync(rs => rs.GEOCODE == geocode);

                if (rateSource == null)
                {
                    return NotFound($"Rate source with geocode {geocode} not found");
                }
                return Ok(rateSource);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving rate source {geocode}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateRateSource([FromBody] RateDto rateSource)
        {
            try
            {
                // TODO: Implement validation and creation logic
                if (_dbContext.Rates.FirstOrDefault(r => r.GEOCODE == rateSource.GEOCODE) != null)
                {
                    return Conflict($"Rate source with geocode {rateSource.GEOCODE} already exists");
                }
                var rateObj = rateMapper.toRateEntity(rateSource);
                _dbContext.Rates.Add(rateObj);
                await _dbContext.SaveChangesAsync();
                return CreatedAtAction(nameof(GetRateSourceByGeocode), new { geocode = rateSource.GEOCODE }, rateSource);
                // return CreatedAtAction(nameof(GetRateSourceByGeocode), new { geocode = "sample-geocode" }, rateSource);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating rate source");
                return StatusCode(500, "Internal server error");
            }
        }

        // PUT: api/ratesource/{id}
        [HttpPut("{Geocode}")]
        public async Task<IActionResult> UpdateRateSource(string Geocode, [FromBody] Rate rateSource)
        {
            try
            {
        
                var existingRate = await _dbContext.Rates
                    .FirstOrDefaultAsync(r => r.GEOCODE == Geocode);
            
                if (existingRate == null)
                {
                    return NotFound($"Rate source with geocode {Geocode} not found");
                }
                
                // Update the existing rate with new values
                _dbContext.Entry(existingRate).CurrentValues.SetValues(rateSource);
                await _dbContext.SaveChangesAsync();
                return Ok(rateSource);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating rate source {Geocode}");
                return StatusCode(500, "Internal server error");
            }
        }

        // DELETE: api/ratesource/{id}
        [HttpDelete("{Geocode}")]
        public async Task<IActionResult> DeleteRateSource(string Geocode)
        {
            try
            {
                var rateSource = await _dbContext.Rates
                    .FirstOrDefaultAsync(r => r.GEOCODE == Geocode);
                
                if (rateSource == null)
                {
                    return NotFound($"Rate source with geocode {Geocode} not found");
                }
                
                _dbContext.Rates.Remove(rateSource);
                await _dbContext.SaveChangesAsync();
                return NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting rate source {Geocode}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}