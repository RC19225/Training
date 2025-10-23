using BackendApi.Models;
namespace BackendApi.Dtos;
public class RateDto 
{
    public required string GEOCODE { get; set; } 
    public string STATE { get; set; } = string.Empty;
    public string COUNTY { get; set; } = string.Empty;
    public string CITY { get; set; } = string.Empty;
    public decimal? State_Tax_Rate { get; set; }
    public decimal? County_Tax_Rate { get; set; }
    public decimal? City_Tax_Rate { get; set; }
    public DateTime? Effective_Date { get; set; } 
}