using _DAL.DALModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _DAL.DALServices
{
    public interface IItemService
    {
        IEnumerable<Item> GetItems();
        Item GetItem(int id);
        Task PutItem(int id, Item item);

        Task DeleteItem(int id);
        Task PostItem(Item item);


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

        public Item GetItem(int id)
        {
            var efItem = _context.Items.Find(id);

            var retItem = new Item
            {
                ItemId = efItem.ItemId,
                Name = efItem.Name,
            };

            return retItem;
        }

        public IEnumerable<Item> GetItems()
        {
            var efItems = _context.Items.ToList();
            var retItems = new List<Item>();

            foreach (var item in efItems)
            {
                retItems.Add(new Item
                {
                    ItemId = item.ItemId,
                    Name = item.Name,
                });
            }

            return retItems;
        }

        public async Task PostItem(Item item)
        {
            //Todo ensure this method runs correctly im not great with async calls
            var efItem = new Item
            {
                ItemId = item.ItemId,
                Name = item.Name,
            };

            _context.Items.Add(efItem);
            await _context.SaveChangesAsync();
        }

        public async Task PutItem(int id, Item item)
        {
            //Todo ensure this method runs correctly im not great with async calls
            var efItem = _context.Items.Find(id);

            if (efItem != null)
            {
                efItem.Name = item.Name;

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
