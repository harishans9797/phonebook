using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PhonebookAPI.Models
{
    [Table("phonebook")]
    public class Phonebook
    {
        [Key]
        public int Id_user { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        [StringLength(50)]
        public string LastName { get; set; }

        [Required(ErrorMessage = "Phone Number is needed.")]
        [RegularExpression(@"^\(?([0-9]{3})\)?[/. ]?([0-9]{3})[-. ]?([0-9]{3})$", ErrorMessage = "Not a valid phone number")]
        public string Phone { get; set; }


        [Required]
        public bool Male { get; set; }

        [Required]
        public bool Female { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [ForeignKey(nameof(City))]
        public int City_Id { get; set; }

        [Required]
        [ForeignKey(nameof(Country))]
        public int Country_Id { get; set; }

        [Required]
        public DateTime BirthDate { get; set; }

        public string BirthdayFormat
        {
            get
            {
                return BirthDate.ToString("yyyy-MM-dd");
            }
        }
        public int Old { get; set; }

    }
}
