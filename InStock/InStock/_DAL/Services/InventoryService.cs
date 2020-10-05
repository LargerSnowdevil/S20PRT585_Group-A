using InStock._BLL.Models;
using InStock._DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InStock._DAL.Services
{
    public interface IInventoryService
    {
        IEnumerable<InventoryBll> GetInventoryItems();
        InventoryBll GetInventoryItem(int id);
        Task PutInventoryItem(int id, InventoryBll item);
        Task DeleteInventoryItem(int id);
        Task PostInventoryItem(InventoryBll item);
    }

    public class InventoryService : IInventoryService
    {
        private readonly ItemContext _context;

        public InventoryService(ItemContext context)
        {
            _context = context;
        }

        public async Task DeleteInventoryItem(int id)
        {
            var item = _context.Inventories.Find(id);
            if (item != null)
            {
                _context.Inventories.Remove(item);
                await _context.SaveChangesAsync();
            }
            else
            {
                //Todo what happens if the item does not exist?
            }
        }

        public InventoryBll GetInventoryItem(int id)
        {
            var efItem = _context.Inventories.Find(id);
           // var retitems = new List<ItemBll>();
            var itm = _context.Items.Find(efItem.ItemId);
            var shp = _context.Shops.Find(efItem.ShopId);

            var retItem = new InventoryBll
            {
                SKU = efItem.SKU,
                Available = efItem.Available,
                Quantity = efItem.Quantity,
                ShopId = efItem.ShopId,
                ItemId = efItem.ItemId,
                Items = new ItemBll
                {
                    Id = itm.ItemId,
                    Name = itm.Name
                },
                Shops = new ShopBll
                {
                    ShopId = shp.ShopId,
                    Name = shp.Name,
                    Address = shp.Address,
                    ContactNumber = shp.ContactNumber,
                    Lat = shp.Lat,
                    Long = shp.Long
                }
            };

            return retItem;
        }

        public IEnumerable<InventoryBll> GetInventoryItems()
        {
            var efItems = _context.Inventories.ToList();
            var retItems = new List<InventoryBll>();

            foreach (var item in efItems)
            {
                var itm = _context.Items.Find(item.ItemId);
                var shp = _context.Shops.Find(item.ShopId);

                retItems.Add(new InventoryBll
                {
                    SKU = item.SKU,
                    Available = item.Available,
                    Quantity = item.Quantity,
                    ShopId = item.ShopId,
                    ItemId = item.ItemId,
                    Items = new ItemBll
                    {
                        Id = itm.ItemId,
                        Name = itm.Name
                    },
                    Shops = new ShopBll
                    {
                        ShopId = shp.ShopId,
                        Name = shp.Name,
                        Address = shp.Address,
                        ContactNumber = shp.ContactNumber,
                        Lat = shp.Lat,
                        Long = shp.Long
                    }

                });
            }

            return retItems;
        }

        public async Task PostInventoryItem(InventoryBll item)
        {
            //Todo ensure this method runs correctly im not great with async calls
            var efItem = new Inventory
            {
                SKU = item.SKU,
                Available = item.Available,
                Quantity = item.Quantity,
                ShopId = item.ShopId,
                ItemId = item.ItemId
            };

            _context.Inventories.Add(efItem);
            await _context.SaveChangesAsync();
        }

        public async Task PutInventoryItem(int id, InventoryBll item)
        {
            var efItem = _context.Inventories.Find(id);
         // var ef = _context.Items.Find(item.Item.Id);

            if (efItem != null)
            {
                efItem.Available = item.Available;
                efItem.Quantity = item.Quantity;
                efItem.ShopId = item.ShopId;
                efItem.ItemId = item.ItemId;

                // efItem.Item = ef;

                _context.Inventories.Update(efItem);
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
