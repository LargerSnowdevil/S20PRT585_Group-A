﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace InStock._DAL.Models
{
    public class Item
    {
            [Key]
            public int ItemId { get; set; }

            [Column(TypeName = "varchar(16)")]
            public string Name { get; set; }

            public List<Inventory> Inventory { get; set; }
 

          


    }
}
