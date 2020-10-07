using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace InStock.models
{
    public class ItemImgUpViewModel
    {
        public int Id { get; set; }

        [Column(TypeName = "varchar(32)")]
        public string Name { get; set; }

        public IFormFile Image { get; set; }
    }
}
