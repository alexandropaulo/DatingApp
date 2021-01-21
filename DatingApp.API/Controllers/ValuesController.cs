using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // GET api/values
        private readonly DataContext _context;
        public ValuesController(DataContext context)
        {
            _context = context;

        }
        [AllowAnonymous]
        [HttpGet]
        //public ActionResult<IEnumerable<string>> Get() retorna uma coleção de srings, retirado do código
        //O comando abaixo retorna respostas http alem de trabalhar com coleções

        //public IActionResult Get() Alterada pois como estava não permitia várias requisições ao mesmo tempo
        //para que isso ocorra criamos threads com as mudanças abaixo
        public async Task<IActionResult> Get()
        {
            //return new string[] { "value1", "value2" };
            //var values = _context.Values.ToList(); alterado para thread
            var values = await _context.Values.ToListAsync();
            return Ok(values);
        }

        // GET api/values/5
        [AllowAnonymous]
        [HttpGet("{id}")]

        //public ActionResult<string> Get(int id) retirado
        //public IActionResult GetValue(int id) alterado para thread
        public async Task<IActionResult> GetValue(int id)
        {
            //return "value";
            //var value = _context.Values.FirstOrDefault(x => x.Id == id);
            var value = await _context.Values.FirstOrDefaultAsync(x => x.Id == id);
            return Ok(value);

        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
