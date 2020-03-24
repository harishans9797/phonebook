using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PhonebookAPI.Models
{
    [Table("city")]
    public class City
    {
        [Key]
        public int City_id { get; set; }
        public string  City_name {get; set;}

        public int Country_Id { get; set; }

    }
}
