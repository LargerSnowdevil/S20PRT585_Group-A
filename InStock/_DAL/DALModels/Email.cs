using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace _DAL.DALModels
{
    public class Email
    {
  
        public int EmailId { get; set; }
        public string EmailAddress { get; set; }
    }
}
