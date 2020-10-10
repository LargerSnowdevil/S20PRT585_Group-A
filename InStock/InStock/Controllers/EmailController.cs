using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using COMMON;
using _BLL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InStock.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly EmailServiceBll _emailService;

        public EmailController(EmailServiceBll emailService)
        {
            _emailService = emailService;
        }

        // GET: api/Items
        [HttpGet]
        public ActionResult<IEnumerable<EmailBll>> GetEmails()
        {
            return _emailService.GetEmails().ToList();
        }
        /*[HttpGet("search/{name}")]
        public ActionResult<IEnumerable<ItemBll>> Search(string name)
        {
            //Todo search currently is case sencitive change this later
            return _emailService.Search(name).ToList();
        }*/

        // GET: api/Items/5
        [HttpGet("{id}")]
        public ActionResult<EmailBll> GetEmail(int id)
        {
            return _emailService.GetEmail(id);
        }
        /*
                // PUT: api/Items/5
                // To protect from overposting attacks, enable the specific properties you want to bind to, for
                // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
                [HttpPut("{id}")]
                public async Task<IActionResult> PutItem(int id, ItemBll item)
                {
                    if (id != item.Id)
                    {
                        return BadRequest();
                    }

                    await _itemService.PutItem(id, item);

                    return NoContent();
                }*/

        // POST: api/Email
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<EmailBll>> PostEmail(EmailBll email)
        {
            await _emailService.PostEmail(email);

            return CreatedAtAction("GetItem", new { id = email.EmailId }, email);
        }

        // DELETE: api/Items/5
        /* [HttpDelete("{id}")]
         public async Task<ActionResult<ItemBll>> DeleteItem(int id)
         {
             var item = _itemService.GetItem(id);
             if (item == null)
             {
                 return NotFound();
             }

             await _itemService.DeleteItem(id);

             return item;
         }*/
    }
}
