using Microsoft.EntityFrameworkCore;
using PhonebookAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhonebookAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
           : base(options)
        {

        }
        public DbSet<Phonebook> phonebook { get; set; }
        public DbSet<City> city { get; set; }
        public DbSet<Country> country { get; set; }
    }
}
