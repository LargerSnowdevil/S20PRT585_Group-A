using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InStock._DAL.Models
{
    public class DimShopItem
    {
        public int Id { get; set; }

        public Item Item { get; set; }

        public Shop Shop { get; set; }
    }
}
