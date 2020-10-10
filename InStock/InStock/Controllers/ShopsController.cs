using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using COMMON;
using _BLL;

namespace InStock.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShopsController : ControllerBase
    {
        private readonly IShopServiceBll _shopService;

        public ShopsController(IShopServiceBll shopService)
        {
            _shopService = shopService;
        }

        // GET: api/Shops
        [HttpGet]
        public ActionResult<IEnumerable<ShopBll>> GetShops()
        {
            return _shopService.GetShops().ToList();
        }

        // GET: api/Shops/5
        [HttpGet("{id}")]
        public ActionResult<ShopBll> GetShop(int id)
        {
            return _shopService.GetShop(id);
        }

        // PUT: api/Shops/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutShop(int id, ShopBll shop)
        {
            if (id != shop.ShopId)
            {
                return BadRequest();
            }

            await _shopService.PutShop(id, shop);

            return NoContent();
        }

        // POST: api/Shops
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ShopBll>> PostShop(ShopBll shop)
        {
            await _shopService.PostShop(shop);

            return CreatedAtAction("GetShop", new { id = shop.ShopId }, shop);
        }

        // DELETE: api/Shops/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ShopBll>> DeleteShop(int id)
        {
            var shop = _shopService.GetShop(id);
            if (shop == null)
            {
                return NotFound();
            }

            await _shopService.DeleteShop(id);

            return shop;
        }
    }
}
