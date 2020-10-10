using COMMON;
using _DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _BLL
{
    public interface IShopServiceBll
    {
        IEnumerable<ShopBll> GetShops();
        ShopBll GetShop(int id);
        Task PutShop(int id, ShopBll shop);
        Task DeleteShop(int id);
        Task PostShop(ShopBll shop);
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

        public ShopBll GetShop(int id)
        {
            return _dataService.GetShop(id);
        }

        public IEnumerable<ShopBll> GetShops()
        {
            return _dataService.GetShops();
        }

        public Task PostShop(ShopBll shop)
        {
            return _dataService.PostShop(shop);
        }

        public Task PutShop(int id, ShopBll shop)
        {
            return _dataService.PutShop(id, shop);
        }
    }
}
