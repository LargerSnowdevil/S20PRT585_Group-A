using COMMON;
using _DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _BLL
{
    public interface IEmailServiceBll
    {
        Task PostEmail(EmailBll email);
        IEnumerable<EmailBll> GetEmails();
        EmailBll GetEmail(int id);

    }
    public class EmailServiceBll : IEmailServiceBll
    {
        private readonly IEEmailService _emailService;

        public EmailServiceBll(IEEmailService service)
        {
            _emailService = service;
        }

        public Task PostEmail(EmailBll email)
        {
            return _emailService.PostEmail(email);
        }

        public EmailBll GetEmail(int id)
        {
            return _emailService.GetEmail(id);
        }

        public IEnumerable<EmailBll> GetEmails()
        {
            return _emailService.GetEmails();
        }
    }

}
