﻿
using _DAL.DALModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _DAL.DALServices
{
    public interface IShopService
    {
        IEnumerable<Shop> GetShops();
        Shop GetShop(int id);
        Task PutShop(int id, Shop shop);
        Task DeleteShop(int id);
        Task PostShop(Shop shop);
    }

    public class ShopService : IShopService
    {
        private readonly ItemContext _context;

        public ShopService(ItemContext context)
        {
            _context = context;
        }

        public async Task DeleteShop(int id)
        {
            var shop = _context.Shops.Find(id);

            if (shop != null)
            {
                _context.Shops.Remove(shop);
                await _context.SaveChangesAsync();
            }
            else
            {
                //Todo what happens if the item does not exist?
            }
        }

        public Shop GetShop(int id)
        {
            var efShop = _context.Shops.Find(id);

            var retShop = new Shop { 
                ShopId = efShop.ShopId,
                Name = efShop.Name,
                ContactNumber = efShop.ContactNumber,
                Address = efShop.Address,
                Lat = efShop.Lat,
                Long = efShop.Long
            };

            return retShop;
        }

        public IEnumerable<Shop> GetShops()
        {
            var efShops = _context.Shops.ToList();
            var retShops = new List<Shop>();

            foreach (var item in efShops)
            {
                retShops.Add(new Shop {
                    ShopId = item.ShopId,
                    Name = item.Name,
                    ContactNumber = item.ContactNumber,
                    Address = item.Address,
                    Lat = item.Lat,
                    Long = item.Long
                });
            }

            return retShops;
        }

        public async Task PostShop(Shop shop)
        {
            //Todo ensure this method runs correctly im not great with async calls
            var efShop = new Shop
            {
                ShopId = shop.ShopId,
                Name = shop.Name,
                ContactNumber = shop.ContactNumber,
                Address = shop.Address,
                Lat = shop.Lat,
                Long = shop.Long
            };

            _context.Shops.Add(efShop);
            await _context.SaveChangesAsync();
        }

        public async Task PutShop(int id, Shop shop)
        {
            //Todo ensure this method runs correctly im not great with async calls
            var efShop = _context.Shops.Find(id);

            if (efShop != null)
            {
                efShop.Name = shop.Name;
                efShop.ContactNumber = shop.ContactNumber;
                efShop.Address = shop.Address;
                efShop.Lat = shop.Lat;
                efShop.Long = shop.Long;
            }

            _context.Shops.Update(efShop);
            await _context.SaveChangesAsync();
        }
    }
}
