using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace _DAL.DALModels
{
    public class Inventory
    {
        [Key]
        public int SKU { get;   set; }
        [Required]
        public int Available { get; set; }
        [Required]
        public int Quantity { get;   set; }
        public int ItemId { get; set; }
        public int ShopId { get; set; }
        public Item Item { get; set; }
        public Shop Shop { get; set; }

    }
}
