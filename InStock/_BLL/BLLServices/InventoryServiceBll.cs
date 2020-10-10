
using _DAL.DALModels;
using _DAL.DALServices;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace _BLL.BLLServices
{
    public interface IInventoryServiceBll
    {
        IEnumerable<Inventory> GetInventoryItems();
        Inventory GetInventoryItem(int id);
        Task PutInventoryItem(int id, Inventory item);
        Task DeleteInventoryItem(int id);
        Task PostInventoryItem(Inventory item);

        IEnumerable<Inventory> Search(string name);
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

        public Inventory GetInventoryItem(int id)
        {
            return _dataService.GetInventoryItem(id);
        }

        public IEnumerable<Inventory> GetInventoryItems()
        {
            return _dataService.GetInventoryItems();
        }

        public Task PostInventoryItem(Inventory item)
        {
            return _dataService.PostInventoryItem(item);
        }

        public Task PutInventoryItem(int id, Inventory item)
        {
            return _dataService.PutInventoryItem(id, item);
        }

        public IEnumerable<Inventory> Search(string query)
        {
            var inventory = _dataService.GetInventoryItems();
            var results = new List<Inventory>();

            var culture = new CultureInfo("en-AU");

            foreach (var item in inventory)
            {
                if (culture.CompareInfo.IndexOf(item.Item.Name, query, CompareOptions.IgnoreCase) >= 0)
                {
                    results.Add(item);
                }
            }

            return results;
        }
    }
}
