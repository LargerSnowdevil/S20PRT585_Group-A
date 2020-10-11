using _BLL;
using COMMON;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InStock.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoriesController : ControllerBase
    {
        private readonly IInventoryServiceBll _itemService;

        public InventoriesController(IInventoryServiceBll itemService)
        {
            _itemService = itemService;
        }

        // GET: api/I 
        [HttpGet]
        public ActionResult<IEnumerable<InventoryBll>> GetItems()
        {
            return _itemService.GetInventoryItems().ToList();
        }

        // GET: api/Items/5
        [HttpGet("{id}")]
        public ActionResult<InventoryBll> GetItem(int id)
        {
            return _itemService.GetInventoryItem(id);
        }

        // PUT: api/Items/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItem(int id, InventoryBll item)
        {
            if (id != item.SKU)
            {
                return BadRequest();
            }

            await _itemService.PutInventoryItem(id, item);

            return NoContent();
        }

        // POST: api/Items
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<InventoryBll>> PostItem(InventoryBll item)
        {
            await _itemService.PostInventoryItem(item);

            return CreatedAtAction("GetItem", new { id = item.SKU }, item);
        }

        // DELETE: api/Items/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<InventoryBll>> DeleteItem(int id)
        {
            var item = _itemService.GetInventoryItem(id);
            if (item == null)
            {
                return NotFound();
            }

            await _itemService.DeleteInventoryItem(id);

            return item;
        }

        [HttpGet("search/{name}")]
        public ActionResult<IEnumerable<InventoryBll>> Search(string name)
        {
            return _itemService.Search(name).ToList();
        }
    }
}
