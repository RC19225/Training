using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace BackendApi.Models 
{
    public class Rate 
    {
        [Key]
        [Required]
        [StringLength(20)]
        public string GEOCODE { get; set; } = string.Empty;

        [StringLength(10)]
        public string ZIP { get; set; } = string.Empty;

        [StringLength(50)]
        public string STATE_NAME { get; set; } = string.Empty;

        // State Sales Rates Set 1
        public decimal? STATE_SALES_RATE1 { get; set; }
        public decimal? STATE_SALES_MINIMUM1 { get; set; }
        public decimal? STATE_SALES_MAXIMUM1 { get; set; }
        public decimal? STATE_SALES_SPLIT_AMOUNT1 { get; set; }
        public decimal? STATE_SPLIT_SALES_RATE1 { get; set; }
        public decimal? STATE_SALES_MAX_TAX_AMOUNT1 { get; set; }

        // State Sales Rates Set 2
        public decimal? STATE_SALES_RATE2 { get; set; }
        public decimal? STATE_SALES_MINIMUM2 { get; set; }
        public decimal? STATE_SALES_MAXIMUM2 { get; set; }
        public decimal? STATE_SALES_SPLIT_AMOUNT2 { get; set; }
        public decimal? STATE_SALES_SPLIT_RATE2 { get; set; }
        public decimal? STATE_SALES_MAX_TAX_AMOUNT2 { get; set; }

        // State Sales Rates Set 3
        public decimal? STATE_SALES_RATE3 { get; set; }
        public decimal? STATE_SALES_MINIMUM3 { get; set; }
        public decimal? STATE_SALES_MAXIMUM3 { get; set; }
        public decimal? STATE_SALES_SPLIT_AMOUNT3 { get; set; }
        public decimal? STATE_SALES_SPLIT_RATE3 { get; set; }
        public decimal? STATE_SALES_MAX_TAX_AMOUNT3 { get; set; }

        // State Use Rates Set 1
        public decimal? STATE_USE_RATE1 { get; set; }
        public decimal? STATE_USE_MINIMUM1 { get; set; }
        public decimal? STATE_USE_MAXIMUM1 { get; set; }
        public decimal? STATE_USE_SPLIT_AMOUNT1 { get; set; }
        public decimal? STATE_SPLIT_USE_RATE1 { get; set; }
        public decimal? STATE_USE_MAX_TAX_AMOUNT1 { get; set; }

        // State Use Rates Set 2
        public decimal? STATE_USE_RATE2 { get; set; }
        public decimal? STATE_USE_MINIMUM2 { get; set; }
        public decimal? STATE_USE_MAXIMUM2 { get; set; }
        public decimal? STATE_USE_SPLIT_AMOUNT2 { get; set; }
        public decimal? STATE_USE_SPLIT_RATE2 { get; set; }
        public decimal? STATE_USE_MAX_TAX_AMOUNT2 { get; set; }

        // State Use Rates Set 3
        public decimal? STATE_USE_RATE3 { get; set; }
        public decimal? STATE_USE_MINIMUM3 { get; set; }
        public decimal? STATE_USE_MAXIMUM3 { get; set; }
        public decimal? STATE_USE_SPLIT_AMOUNT3 { get; set; }
        public decimal? STATE_USE_SPLIT_RATE3 { get; set; }
        public decimal? STATE_USE_MAX_TAX_AMOUNT3 { get; set; }

        [StringLength(100)]
        public string COUNTY_NAME { get; set; } = string.Empty;

        // County Sales Rates Set 1
        public decimal? COUNTY_SALES_RATE1 { get; set; }
        public decimal? COUNTY_SALES_MINIMUM1 { get; set; }
        public decimal? COUNTY_SALES_MAXIMUM1 { get; set; }
        public decimal? COUNTY_SALES_SPLIT_AMOUNT1 { get; set; }
        public decimal? COUNTY_SPLIT_SALES_RATE1 { get; set; }
        public decimal? COUNTY_SALES_MAX_TAX_AMOUNT1 { get; set; }

        // County Sales Rates Set 2
        public decimal? COUNTY_SALES_RATE2 { get; set; }
        public decimal? COUNTY_SALES_MINIMUM2 { get; set; }
        public decimal? COUNTY_SALES_MAXIMUM2 { get; set; }
        public decimal? COUNTY_SALES_SPLIT_AMOUNT2 { get; set; }
        public decimal? COUNTY_SALES_SPLIT_RATE2 { get; set; }
        public decimal? COUNTY_SALES_MAX_TAX_AMOUNT2 { get; set; }

        // County Sales Rates Set 3
        public decimal? COUNTY_SALES_RATE3 { get; set; }
        public decimal? COUNTY_SALES_MINIMUM3 { get; set; }
        public decimal? COUNTY_SALES_MAXIMUM3 { get; set; }
        public decimal? COUNTY_SALES_SPLIT_AMOUNT3 { get; set; }
        public decimal? COUNTY_SALES_SPLIT_RATE3 { get; set; }
        public decimal? COUNTY_SALES_MAX_TAX_AMOUNT3 { get; set; }

        // County Use Rates Set 1
        public decimal? COUNTY_USE_RATE1 { get; set; }
        public decimal? COUNTY_USE_MINIMUM1 { get; set; }
        public decimal? COUNTY_USE_MAXIMUM1 { get; set; }
        public decimal? COUNTY_USE_SPLIT_AMOUNT1 { get; set; }
        public decimal? COUNTY_SPLIT_USE_RATE1 { get; set; }
        public decimal? COUNTY_USE_MAX_TAX_AMOUNT1 { get; set; }

        // County Use Rates Set 2
        public decimal? COUNTY_USE_RATE2 { get; set; }
        public decimal? COUNTY_USE_MINIMUM2 { get; set; }
        public decimal? COUNTY_USE_MAXIMUM2 { get; set; }
        public decimal? COUNTY_USE_SPLIT_AMOUNT2 { get; set; }
        public decimal? COUNTY_USE_SPLIT_RATE2 { get; set; }
        public decimal? COUNTY_USE_MAX_TAX_AMOUNT2 { get; set; }

        // County Use Rates Set 3
        public decimal? COUNTY_USE_RATE3 { get; set; }
        public decimal? COUNTY_USE_MINIMUM3 { get; set; }
        public decimal? COUNTY_USE_MAXIMUM3 { get; set; }
        public decimal? COUNTY_USE_SPLIT_AMOUNT3 { get; set; }
        public decimal? COUNTY_USE_SPLIT_RATE3 { get; set; }
        public decimal? COUNTY_USE_MAX_TAX_AMOUNT3 { get; set; }

        [StringLength(100)]
        public string CITY_NAME { get; set; } = string.Empty;

        // City Sales Rates Set 1
        public decimal? CITY_SALES_RATE1 { get; set; }
        public decimal? CITY_SALES_MINIMUM1 { get; set; }
        public decimal? CITY_SALES_MAXIMUM1 { get; set; }
        public decimal? CITY_SALES_SPLIT_AMOUNT1 { get; set; }
        public decimal? CITY_SPLIT_SALES_RATE1 { get; set; }
        public decimal? CITY_SALES_MAX_TAX_AMOUNT1 { get; set; }

        // City Sales Rates Set 2
        public decimal? CITY_SALES_RATE2 { get; set; }
        public decimal? CITY_SALES_MINIMUM2 { get; set; }
        public decimal? CITY_SALES_MAXIMUM2 { get; set; }
        public decimal? CITY_SALES_SPLIT_AMOUNT2 { get; set; }
        public decimal? CITY_SALES_SPLIT_RATE2 { get; set; }
        public decimal? CITY_SALES_MAX_TAX_AMOUNT2 { get; set; }

        // City Sales Rates Set 3
        public decimal? CITY_SALES_RATE3 { get; set; }
        public decimal? CITY_SALES_MINIMUM3 { get; set; }
        public decimal? CITY_SALES_MAXIMUM3 { get; set; }
        public decimal? CITY_SALES_SPLIT_AMOUNT3 { get; set; }
        public decimal? CITY_SALES_SPLIT_RATE3 { get; set; }
        public decimal? CITY_SALES_MAX_TAX_AMOUNT3 { get; set; }

        // City Use Rates Set 1
        public decimal? CITY_USE_RATE1 { get; set; }
        public decimal? CITY_USE_MINIMUM1 { get; set; }
        public decimal? CITY_USE_MAXIMUM1 { get; set; }
        public decimal? CITY_USE_SPLIT_AMOUNT1 { get; set; }
        public decimal? CITY_SPLIT_USE_RATE1 { get; set; }
        public decimal? CITY_USE_MAX_TAX_AMOUNT1 { get; set; }

        // City Use Rates Set 2
        public decimal? CITY_USE_RATE2 { get; set; }
        public decimal? CITY_USE_MINIMUM2 { get; set; }
        public decimal? CITY_USE_MAXIMUM2 { get; set; }
        public decimal? CITY_USE_SPLIT_AMOUNT2 { get; set; }
        public decimal? CITY_USE_SPLIT_RATE2 { get; set; }
        public decimal? CITY_USE_MAX_TAX_AMOUNT2 { get; set; }

        // City Use Rates Set 3
        public decimal? CITY_USE_RATE3 { get; set; }
        public decimal? CITY_USE_MINIMUM3 { get; set; }
        public decimal? CITY_USE_MAXIMUM3 { get; set; }
        public decimal? CITY_USE_SPLIT_AMOUNT3 { get; set; }
        public decimal? CITY_USE_SPLIT_RATE3 { get; set; }
        public decimal? CITY_USE_MAX_TAX_AMOUNT3 { get; set; }

        // Special Tax Jurisdictions
        [StringLength(100)]
        public string STJ1_NAME { get; set; } = string.Empty;
        public decimal? STJ1_SALES_RATE1 { get; set; }
        public decimal? STJ1_USE_RATE1 { get; set; }

        [StringLength(100)]
        public string STJ2_NAME { get; set; } = string.Empty;
        public decimal? STJ2_SALES_RATE1 { get; set; }
        public decimal? STJ2_USE_RATE1 { get; set; }

        [StringLength(100)]
        public string STJ3_NAME { get; set; } = string.Empty;
        public decimal? STJ3_SALES_RATE1 { get; set; }
        public decimal? STJ3_USE_RATE1 { get; set; }

        [StringLength(100)]
        public string STJ4_NAME { get; set; } = string.Empty;
        public decimal? STJ4_SALES_RATE1 { get; set; }
        public decimal? STJ4_USE_RATE1 { get; set; }

        [StringLength(100)]
        public string STJ5_NAME { get; set; } = string.Empty;
        public decimal? STJ5_SALES_RATE1 { get; set; }
        public decimal? STJ5_USE_RATE1 { get; set; }

        // Combined Rates
        public decimal? COMBINED_SALES_TAX_RATE { get; set; }
        public decimal? COMBINED_USE_TAX_RATE { get; set; }

        // Additional Fields
        [StringLength(50)]
        public string SD_CODE { get; set; } = string.Empty;

        [StringLength(100)]
        public string DEFAULT_CITY { get; set; } = string.Empty;

        public DateTime? EFFECTIVE_DATE { get; set; }

        [StringLength(10)]
        public string HISTORY_FLAG { get; set; } = string.Empty;

        // Tax Authorities
        [StringLength(200)]
        public string STATE_TAX_AUTHORITY { get; set; } = string.Empty;

        [StringLength(200)]
        public string COUNTY_TAX_AUTHORITY { get; set; } = string.Empty;

        [StringLength(200)]
        public string CITY_TAX_AUTHORITY { get; set; } = string.Empty;

        [StringLength(200)]
        public string STJ1_TAX_AUTHORITY { get; set; } = string.Empty;

        [StringLength(200)]
        public string STJ2_TAX_AUTHORITY { get; set; } = string.Empty;

        [StringLength(200)]
        public string STJ3_TAX_AUTHORITY { get; set; } = string.Empty;

        [StringLength(200)]
        public string STJ4_TAX_AUTHORITY { get; set; } = string.Empty;

        [StringLength(200)]
        public string STJ5_TAX_AUTHORITY { get; set; } = string.Empty;

        [StringLength(10)]
        public string UNINCORPORATED_AREA { get; set; } = string.Empty;

        [StringLength(500)]
        public string MAILING_ADDRESS { get; set; } = string.Empty;

        [StringLength(50)]
        public string VERTICAL { get; set; } = string.Empty;

        [StringLength(100)]
        public string REPORTING_CITY { get; set; } = string.Empty;

        // City/County Flags
        [StringLength(10)]
        public string STJ1_CITY_CNTY_FLAG { get; set; } = string.Empty;

        [StringLength(10)]
        public string STJ2_CITY_CNTY_FLAG { get; set; } = string.Empty;

        [StringLength(10)]
        public string STJ3_CITY_CNTY_FLAG { get; set; } = string.Empty;

        [StringLength(10)]
        public string STJ4_CITY_CNTY_FLAG { get; set; } = string.Empty;

        [StringLength(10)]
        public string STJ5_CITY_CNTY_FLAG { get; set; } = string.Empty;
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}