using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InStock._BLL.Services;
using InStock._BLL.Models;

namespace InStock.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly ItemServiceBll _itemService;

        public ItemsController(ItemServiceBll service)
        {
            _itemService = service;
        }

        // GET: api/Items
        [HttpGet]
        public ActionResult<IEnumerable<ItemBll>> GetItems()
        {
            return _itemService.GetItems().ToList();
        }
        [HttpGet("search/{name}")]
        public ActionResult<IEnumerable<ItemBll>> Search(string name)
        {
            return _itemService.Search(name).ToList();
        }

        // GET: api/Items/5
        [HttpGet("{id}")]
        public ActionResult<ItemBll> GetItem(int id)
        {
            return _itemService.GetItem(id);
        }

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
        }

        // POST: api/Items
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ItemBll>> PostItem(ItemBll item)
        {
            await _itemService.PostItem(item);

            return CreatedAtAction("GetItem", new { id = item.Id }, item);
        }

        // DELETE: api/Items/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ItemBll>> DeleteItem(int id)
        {
            var item = _itemService.GetItem(id);
            if (item == null)
            {
                return NotFound();
            }

            await _itemService.DeleteItem(id);

            return item;
        }
    }
}
