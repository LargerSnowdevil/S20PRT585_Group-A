using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InStock._BLL.Models
{
    public class ShopBll
    {
        public int ShopId { get; set; }
        public List<ItemBll> Items { get; set; }
    }
}
