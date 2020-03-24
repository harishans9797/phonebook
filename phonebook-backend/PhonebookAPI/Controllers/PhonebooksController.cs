using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhonebookAPI.Data;
using PhonebookAPI.Models;

namespace PhonebookAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhonebooksController : ControllerBase
    {
        private readonly DataContext _context;

        public PhonebooksController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Phonebooks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Phonebook>>> Getphonebook()
        {
            
             return await _context.phonebook.ToListAsync();
        }

        // GET: api/Phonebooks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Phonebook>> GetPhonebook(int id)
        {
            var phonebook = await _context.phonebook.FindAsync(id);

            if (phonebook == null)
            {
                return NotFound();
            }

            return phonebook;
        }

        // PUT: api/Phonebooks/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPhonebook(int id, Phonebook phonebook)
        {
            if (id != phonebook.Id_user)
            {
                return BadRequest();
            }

            _context.Entry(phonebook).State = EntityState.Modified;

            try
            {
                phonebook.Old = CalculateAge(phonebook.BirthDate);
                _context.SaveChanges();
                _context.phonebook.Add(phonebook);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PhonebookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Phonebooks
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Phonebook>> PostPhonebook(Phonebook phonebook)
        {
            
            phonebook.Old = CalculateAge(phonebook.BirthDate);
            _context.SaveChanges();
            _context.phonebook.Add(phonebook);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPhonebook", new { id = phonebook.Id_user }, phonebook);
        }
        

        // DELETE: api/Phonebooks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Phonebook>> DeletePhonebook(int id)
        {
            var phonebook = await _context.phonebook.FindAsync(id);
            if (phonebook == null)
            {
                return NotFound();
            }

            _context.phonebook.Remove(phonebook);
            await _context.SaveChangesAsync();

            return phonebook;
        }

        private bool PhonebookExists(int id)
        {
            return _context.phonebook.Any(e => e.Id_user == id);
        }

        public static int CalculateAge(DateTime birthDay)
        {
            int years = DateTime.Now.Year - birthDay.Year;

            if ((birthDay.Month > DateTime.Now.Month) || (birthDay.Month == DateTime.Now.Month && birthDay.Day > DateTime.Now.Day))
                years--;

            return years;
        }
    }
}
