using InStock._BLL.Models;
using InStock._DAL.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InStock._BLL.Services
{
    public interface IInventoryServiceBll
    {
        IEnumerable<InventoryBll> GetInventoryItems();
        InventoryBll GetInventoryItem(int id);
        Task PutInventoryItem(int id, InventoryBll item);
        Task DeleteInventoryItem(int id);
        Task PostInventoryItem(InventoryBll item);
    }

    public class InventoryServiceBll : IInventoryServiceBll
    {
        private readonly IInventoryService _dataService;

        public InventoryServiceBll(IInventoryService context)
        {
            _dataService = context;
        }

        public Task DeleteInventoryItem(int id)
        {
            return _dataService.DeleteInventoryItem(id);
        }

        public InventoryBll GetInventoryItem(int id)
        {
            return _dataService.GetInventoryItem(id);
        }

        public IEnumerable<InventoryBll> GetInventoryItems()
        {
            return _dataService.GetInventoryItems();
        }

        public Task PostInventoryItem(InventoryBll item)
        {
            return _dataService.PostInventoryItem(item);
        }

        public Task PutInventoryItem(int id, InventoryBll item)
        {
            return _dataService.PutInventoryItem(id, item);
        }
    }
}
