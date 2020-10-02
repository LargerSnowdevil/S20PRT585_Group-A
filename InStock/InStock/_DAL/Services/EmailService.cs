using InStock._BLL.Models;
using InStock._DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InStock._DAL.Services
{
    public interface IEEmailService
    {
        Task PostEmail(EmailBll email);
        IEnumerable<EmailBll> GetEmails();
        EmailBll GetEmail(int id);
    }
    public class EmailService : IEEmailService
    {
        private readonly ItemContext _context;

        public EmailService(ItemContext context)
        {
            _context = context;
        }



        public async Task PostEmail(EmailBll email)
        {
            //Todo ensure this method runs correctly im not great with async calls
            var efEmail = new Email
            {
                EmailId = email.EmailId,
                EmailAddress = email.EmailAddress,
            };

            _context.Emails.Add(efEmail);
            await _context.SaveChangesAsync();
        }

        public EmailBll GetEmail(int id)
        {
            var efEmail = _context.Emails.Find(id);

            var retEmail = new EmailBll
            {
                EmailId = efEmail.EmailId,
                EmailAddress = efEmail.EmailAddress,
            };

            return retEmail;
        }

        public IEnumerable<EmailBll> GetEmails()
        {
            var efEmails = _context.Emails.ToList();
            var retEmails = new List<EmailBll>();

            foreach (var mail in efEmails)
            {
                retEmails.Add(new EmailBll
                {
                    EmailId = mail.EmailId,
                    EmailAddress = mail.EmailAddress,
                });
            }

            return retEmails;
        }



    }

}
