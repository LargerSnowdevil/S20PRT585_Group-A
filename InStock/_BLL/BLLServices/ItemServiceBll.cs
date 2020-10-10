using _DAL.DALModels;
using _DAL.DALServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _BLL.BLLServices
{
    public interface IItemServiceBll
    {
        IEnumerable<Item> GetItems();
        Item GetItem(int id);
        Task PutItem(int id, Item item);

        Task DeleteItem(int id);
        Task PostItem(Item item);


    }

    public class ItemServiceBll : IItemServiceBll
    {
        private readonly IItemService _itemService;

        public ItemServiceBll(IItemService service)
        {
            _itemService = service;
        }

        public Task DeleteItem(int id)
        {
            return _itemService.DeleteItem(id);
        }

        public Item GetItem(int id)
        {
            return _itemService.GetItem(id);
        }

        public IEnumerable<Item> GetItems()
        {
            return _itemService.GetItems();
        }

        public Task PostItem(Item item)
        {
            return _itemService.PostItem(item);
        }

        public Task PutItem(int id, Item item)
        {
            return _itemService.PutItem(id, item);
        }
    }

}
