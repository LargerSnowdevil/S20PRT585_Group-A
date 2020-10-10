using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace COMMON.BLLModels
{
    public class Inventory
    {
        public int SKU { get; set; }
        public int Available { get; set; }
        public int Quantity { get; set; }
        public int ShopId { get; set; }
        public int ItemId { get; set; }
        public Item Item { get; set; }
        public Shop Shop { get; set; }
    }
}
