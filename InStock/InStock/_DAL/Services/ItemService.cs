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
        ItemBll GetItem(int id);
        Task PutItem(int id, ItemBll item);

        Task DeleteItem(int id);
        Task PostItem(ItemBll item);


    }

    public class ItemService : IItemService
    {
        private readonly ItemContext _context;

        public ItemService(ItemContext context)
        {
            _context = context;
        }

        public async Task DeleteItem(int id)
        {
            var item = _context.Items.Find(id);
            if (item != null)
            {
                _context.Items.Remove(item);
                await _context.SaveChangesAsync();
            }
            else
            {
                //Todo what happens if the item does not exist?
            }
        }

        public ItemBll GetItem(int id)
        {
            var efItem = _context.Items.Find(id);
            var efShop = _context.Shops.Find(efItem.ShopId);

            var retItem = new ItemBll
            {
                Id = efItem.ItemId,
                Name = efItem.Name,
                SKU = efItem.SKU,
                Price = efItem.Price,
                InStock = efItem.InStock,
                Quantity = efItem.Quantity,
                Shop = new ShopBll
                {
                    Name = efShop.Name,
                    ShopId = efShop.ShopId
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
                    Id = item.ItemId,
                    Name = item.Name,
                    SKU = item.SKU,
                    Price = item.Price,
                    InStock = item.InStock,
                    Quantity = item.Quantity,
                    Shop = new ShopBll
                    {
                        Name = efShop.Name,
                        ShopId = efShop.ShopId
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
                ItemId = item.Id,
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

        public async Task PutItem(int id, ItemBll item)
        {
            //Todo ensure this method runs correctly im not great with async calls
            var efItem = _context.Items.Find(id);
            var efShop = _context.Shops.Find(item.Shop.ShopId);

            if (efItem != null)
            {
                efItem.Name = item.Name;
                efItem.SKU = item.SKU;
                efItem.Price = item.Price;
                efItem.InStock = item.InStock;
                efItem.Quantity = item.Quantity;
                efItem.ShopId = item.Shop.ShopId;
                efItem.Shop = efShop;

                _context.Items.Update(efItem);
                await _context.SaveChangesAsync();
            }
            else
            {
                //Todo What happens if an item does not exist?
                //Do i need to return a failed task if the item does not exist?
            }
        }
    }
}
