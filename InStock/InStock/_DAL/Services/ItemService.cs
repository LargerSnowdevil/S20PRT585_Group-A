using InStock._BLL.Models;
using InStock._DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InStock._DAL.Services
{
    public interface IItemService
    {
        IEnumerable<ItemBll> GetItems();
        Task<ItemBll> Search(string name);
        ItemBll GetItem(int id);
        Task<ItemBll> PutItem(int id, Item item);

        Task<ItemBll> DeleteItem(int id);
        Task<ItemBll> PostItem(Item item);


    }

    public class ItemService : IItemService
    {
        private readonly ItemContext _context;

        public ItemService(ItemContext context)
        {
            _context = context;
        }

        public Task<ItemBll> DeleteItem(int id)
        {
            throw new NotImplementedException();
        }

        public ItemBll GetItem(int id)
        {
            var efItem = _context.Items.Find(id);
            var efShop = _context.Shops.Find(efItem.ShopId);

            var retItem = new ItemBll
            {
                Id = efItem.Id,
                Name = efItem.Name,
                SKU = efItem.SKU,
                Price = efItem.Price,
                InStock = efItem.InStock,
                Quantity = efItem.Quantity,
                Shop = new ShopBll
                {
                    ShopId = efShop.ShopId,
                }
            };

            return retItem;
        }

        public IEnumerable<ItemBll> GetItems()
        {
            var efItems = _context.Items.ToList();
            var retItems = new List<ItemBll>();

            foreach (var item in efItems)
            {
                var efShop = _context.Shops.Find(item.ShopId);

                retItems.Add(new ItemBll
                {
                    Id = item.Id,
                    Name = item.Name,
                    SKU = item.SKU,
                    Price = item.Price,
                    InStock = item.InStock,
                    Quantity = item.Quantity,
                    Shop = new ShopBll
                    {
                        ShopId = efShop.ShopId,
                    }
                });
            }

            return retItems;
        }

        public async Task PostItem(ItemBll item)
        {
            //Todo ensure this method runs correctly im not great with async calls
            var shop = _context.Shops.Find(item.Shop.ShopId);
            var efItem = new Item
            {
                Id = item.Id,
                Name = item.Name,
                SKU = item.SKU,
                Price = item.Price,
                InStock = item.InStock,
                Quantity = item.Quantity,
                Shop = shop
            };

            _context.Items.Add(efItem);
            await _context.SaveChangesAsync();
        }

        public Task<ItemBll> PutItem(int id, Item item)
        {
            throw new NotImplementedException();
        }

        public Task<ItemBll> Search(string name)
        {
            throw new NotImplementedException();
        }
    }

}
