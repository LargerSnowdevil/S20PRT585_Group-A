using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace COMMON.BLLModels
{
    public class MailRequest
    {
        public string EmailAddress { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }


    }
}
