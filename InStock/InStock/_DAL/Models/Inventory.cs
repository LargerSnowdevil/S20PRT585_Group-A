using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace InStock._DAL.Models
{
    public class Inventory
    {
        [Key]
        public int SKU { get;   set; }
        public int Available { get; set; }
        public int Quantity { get;   set; }

        [ForeignKey("Item")]
        public int ItemId { get; set; }
        public Item Item { get; set; }
    }
}
