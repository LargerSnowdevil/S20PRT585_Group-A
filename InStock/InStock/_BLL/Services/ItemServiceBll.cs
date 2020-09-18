using InStock._DAL.Models;
using InStock._DAL.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InStock._BLL.Services
{
    public interface IItemServiceBll
    {
        Task<IEnumerable<Item>> GetItems();
        Task<Item> Search(string name);
        Task<Item> GetItem(int id);
        Task<Item> PutItem(int id, Item item);

        Task<Item> DeleteItem(int id);
        Task<Item> PostItem(Item item);


    }

    public class ItemServiceBll : IItemServiceBll
    {
        private readonly ItemServiceBll _itemService;

        public ItemServiceBll(ItemServiceBll service)
        {
            _itemService = service;
        }

        public Task<Item> DeleteItem(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Item> GetItem(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Item>> GetItems()
        {
            throw new NotImplementedException();
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
