
using InStock._BLL.Models;
using InStock._DAL.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InStock._BLL.Services
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
