using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InStock._BLL.Models
{
    public class ShopBll
    {
        public int ShopId { get; set; }

        public String Name { get; set; }

        public String ContactNumber { get; set; }

        public String Address { get; set; }

        public double Lat { get; set; }
        public double Long { get; set; }
    }
}
