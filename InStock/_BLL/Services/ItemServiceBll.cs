using COMMON;
using _DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _BLL

{
    public interface IItemServiceBll
    {
        IEnumerable<ItemBll> GetItems();
        ItemBll GetItem(int id);
        Task PutItem(int id, ItemBll item);

        Task DeleteItem(int id);
        Task PostItem(ItemBll item);


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

        public ItemBll GetItem(int id)
        {
            return _itemService.GetItem(id);
        }

        public IEnumerable<ItemBll> GetItems()
        {
            return _itemService.GetItems();
        }

        public Task PostItem(ItemBll item)
        {
            return _itemService.PostItem(item);
        }

        public Task PutItem(int id, ItemBll item)
        {
            return _itemService.PutItem(id, item);
        }
    }

}
