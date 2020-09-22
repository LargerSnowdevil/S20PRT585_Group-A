using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace InStock._DAL.Models
{
    public class Shop
    {
        public int ShopId { get; set; }

        public String Name { get; set; }

        public String ContactNumber { get; set; }

        public String Address { get; set; }

        public double Lat { get; set; }
        public double Long { get; set; }

       //public ICollection<Item> Items { get; set; }

        public List<DimShopItem> Dim { get; set; }

        //public List<Item> Item { get; set; }
    }
}
