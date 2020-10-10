
using _DAL.DALModels;
using _DAL.DALServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _BLL.BLLServices
{
    public interface IShopServiceBll
    {
        IEnumerable<Shop> GetShops();
        Shop GetShop(int id);
        Task PutShop(int id, Shop shop);
        Task DeleteShop(int id);
        Task PostShop(Shop shop);
    }

    public class ShopServiceBll : IShopServiceBll
    {
        private readonly IShopService _dataService;

        public ShopServiceBll(IShopService service)
        {
            _dataService = service;
        }

        public Task DeleteShop(int id)
        {
            return _dataService.DeleteShop(id);
        }

        public Shop GetShop(int id)
        {
            return _dataService.GetShop(id);
        }

        public IEnumerable<Shop> GetShops()
        {
            return _dataService.GetShops();
        }

        public Task PostShop(Shop shop)
        {
            return _dataService.PostShop(shop);
        }

        public Task PutShop(int id, Shop shop)
        {
            return _dataService.PutShop(id, shop);
        }
    }
}
