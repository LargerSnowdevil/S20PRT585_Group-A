using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InStock._DAL.Models
{
    public class Shop
    {
        public int ShopId { get; set; }

        public List<Item> Items { get; set; }
    }
}
