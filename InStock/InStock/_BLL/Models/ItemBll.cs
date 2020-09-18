using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace InStock._BLL.Models
{
    public class ItemBll
    {
       
            [Key]
            public int Id { get; set; }

            [Required]
            [Column(TypeName = "varchar(16)")]
            public string Name { get; set; }

            [Required]
            public int SKU { get; set; }
            [Required]
            public int Price { get; set; }


            public string InStock { get; set; }

            [Required]
            [Column(TypeName = "varchar(16)")]
            public int Quantity { get; set; }

            public ShopBll Shop { get; set; }

        
    }
}
