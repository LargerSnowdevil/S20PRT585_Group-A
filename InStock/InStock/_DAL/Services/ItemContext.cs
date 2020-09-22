using InStock._DAL.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InStock._DAL.Services
{
    public class ItemContext : DbContext
    {

        public ItemContext(DbContextOptions<ItemContext> options) : base(options)
        { }

        public DbSet<Item> Items { get; set; }

        public DbSet<Shop> Shops { get; set; }

        public DbSet<Inventory> Inventories { get; set; }

        public DbSet<DimShopItem> DimShopItems { get; set; }
    }
}
