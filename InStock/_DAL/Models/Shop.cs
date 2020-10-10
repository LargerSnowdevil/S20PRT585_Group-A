using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace _DAL
{
    public class Shop
    {
        [Key]
        public int ShopId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string ContactNumber { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public double Lat { get; set; }
        [Required]
        public double Long { get; set; }

        public List<Inventory> Inventory { get; set; }
    }
}
