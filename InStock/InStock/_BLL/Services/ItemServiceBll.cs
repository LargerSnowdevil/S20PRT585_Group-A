using InStock._BLL.Models;
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
        IEnumerable<ItemBll> GetItems();
        IEnumerable<ItemBll> Search(string name);
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

        public IEnumerable<ItemBll> Search(string name)
        {
            var items = _itemService.GetItems();
            var retItems = new List<ItemBll>();

            foreach (var item in items)
            {
                if (item.Name.CompareTo(name) == 0)
                {
                    retItems.Add(item);
                }
            }

            return retItems;
        }
    }

}
