using COMMON;
using _DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _BLL
{
    public interface IMailServiceBll
    {
        Task SendEmailAsync(MailRequestBll request);
    }
    public class MailServiceBll : IMailServiceBll
    {
        private readonly IMailService _mailService;

        public MailServiceBll(IMailService mailService)
        {
            _mailService = mailService;
        }

        public Task SendEmailAsync(MailRequestBll request)
        {

            return  _mailService.SendEmailAsync(request);

        }
    }
}
