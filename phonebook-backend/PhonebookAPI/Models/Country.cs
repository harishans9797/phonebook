﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PhonebookAPI.Models
{
    [Table("country")]
    public class Country
    {
        [Key]
        public int Country_Id { get; set; }
        [Required]
        public string Country_name { get; set; }
    }
}
