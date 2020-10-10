
using _DAL.DALModels;
using _DAL.DALServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _BLL.BLLServices
{
    public interface EEmailServiceBll
    {
        Task PostEmail(Email email);
        IEnumerable<Email> GetEmails();
        Email GetEmail(int id);

    }
    public class EmailServiceBll : EEmailServiceBll
    {
        private readonly IEEmailService _emailService;

        public EmailServiceBll(IEEmailService service)
        {
            _emailService = service;
        }

        public Task PostEmail(Email email)
        {
            return _emailService.PostEmail(email);
        }

        public Email GetEmail(int id)
        {
            return _emailService.GetEmail(id);
        }

        public IEnumerable<Email> GetEmails()
        {
            return _emailService.GetEmails();
        }
    }

}
