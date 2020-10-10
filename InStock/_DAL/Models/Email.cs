using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace _DAL
{
    public class Email
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int EmailId { get; set; }
        public string EmailAddress { get; set; }
    }
}
