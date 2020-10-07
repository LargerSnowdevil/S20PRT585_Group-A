using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using InStock._BLL.Services;
using InStock._BLL.Models;
using System.IO;
using InStock.models;

namespace InStock.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly IItemServiceBll _itemService;

        public ItemsController(IItemServiceBll itemService)
        {
            _itemService = itemService;
        }

        // GET: api/Items
        [HttpGet]
        public ActionResult<IEnumerable<ItemBll>> GetItems()
        {
            return _itemService.GetItems().ToList();
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
        public async Task<IActionResult> PutItem(int id, [FromForm] ItemImgUpViewModel item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            byte[] img = null;
            using (var sr = item.Image.OpenReadStream())
            using (var ms = new MemoryStream())
            {
                sr.CopyTo(ms);
                img = ms.ToArray();
            }

            var blItem = new ItemBll
            {
                Id = item.Id,
                Name = item.Name,
                Image = img
            };

            await _itemService.PutItem(id, blItem);

            return NoContent();
        }

        // POST: api/Items
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ItemBll>> PostItem([FromForm] ItemImgUpViewModel item)
        {
            byte[] img = null;
            using (var sr = item.Image.OpenReadStream())
            using (var ms = new MemoryStream())
            {
                sr.CopyTo(ms);
                img = ms.ToArray();
            }

            var blItem = new ItemBll
            {
                Id = item.Id,
                Name = item.Name,
                Image = img
            };

            await _itemService.PostItem(blItem);

            return CreatedAtAction("GetItem", new { id = blItem.Id }, blItem);
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
