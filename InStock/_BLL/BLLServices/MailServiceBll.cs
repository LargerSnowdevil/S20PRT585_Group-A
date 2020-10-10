
using _DAL.DALModels;
using _DAL.DALServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _BLL.BLLServices
{
    public interface IMailServiceBll
    {
        Task SendEmailAsync(MailRequest request);
    }
    public class MailServiceBll : IMailServiceBll
    {
        private readonly IMailService _mailService;

        public MailServiceBll(IMailService mailService)
        {
            _mailService = mailService;
        }

        public Task SendEmailAsync(MailRequest request)
        {

            return  _mailService.SendEmailAsync(request);

        }
    }
}
