using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace COMMON
{
    public class ItemBll
    {
        public int Id { get; set; }

        [Column(TypeName = "varchar(32)")]
        public string Name { get; set; }

        public string Image { get; set; }
 
    }
}
