using InStock._DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InStock._DAL.Services
{
    public interface IItemService
    {
        IEnumerable<Item> GetItems();
        Task<Item> Search(string name);
        Item GetItem(int id);
        Task<Item> PutItem(int id, Item item);

        Task<Item> DeleteItem(int id);
        Task<Item> PostItem(Item item);


    }

    public class ItemService : IItemService
    {
        private readonly ItemContext _context;

        public ItemService(ItemContext context)
        {
            _context = context;
        }

        public Task<Item> DeleteItem(int id)
        {
            throw new NotImplementedException();
        }

        public Item GetItem(int id)
        {
            var item = _context.Items.Find(id);

            return item;
        }

        public IEnumerable<Item> GetItems()
        {
            var items = _context.Items.ToList();


        }

        public Task<Item> PostItem(Item item)
        {
            throw new NotImplementedException();
        }

        public Task<Item> PutItem(int id, Item item)
        {
            throw new NotImplementedException();
        }

        public Task<Item> Search(string name)
        {
            throw new NotImplementedException();
        }
    }

}
