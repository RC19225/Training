using BackendApi.Dtos;
using BackendApi.Models;

class rateMapper 
{
    public static RateDto toRateDto(Rate rate)
    {
        return new RateDto
        {
            GEOCODE = rate.GEOCODE,
            STATE = rate.STATE_NAME,
            COUNTY = rate.COUNTY_NAME,
            CITY = rate.CITY_NAME,
            State_Tax_Rate = rate.STATE_SALES_RATE1,
            County_Tax_Rate = rate.COUNTY_SALES_RATE1,
            City_Tax_Rate = rate.CITY_SALES_RATE1,
            Effective_Date = rate.EFFECTIVE_DATE
        };
    }
    public static Rate toRateEntity(RateDto rateDto)
    {
        return new Rate
        {
            GEOCODE = rateDto.GEOCODE,
            STATE_NAME = rateDto.STATE,
            COUNTY_NAME = rateDto.COUNTY,
            CITY_NAME = rateDto.CITY,
            STATE_SALES_RATE1 = rateDto.State_Tax_Rate,
            COUNTY_SALES_RATE1 = rateDto.County_Tax_Rate,
            CITY_SALES_RATE1 = rateDto.City_Tax_Rate,
            EFFECTIVE_DATE = rateDto.Effective_Date
        };
    }
}