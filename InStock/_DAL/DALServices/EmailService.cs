
using _DAL.DALModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _DAL.DALServices
{
    public interface IEEmailService
    {
        Task PostEmail(Email email);
        IEnumerable<Email> GetEmails();
        Email GetEmail(int id);
    }
    public class EmailService : IEEmailService
    {
        private readonly ItemContext _context;

        public EmailService(ItemContext context)
        {
            _context = context;
        }



        public async Task PostEmail(Email email)
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

        public Email GetEmail(int id)
        {
            var efEmail = _context.Emails.Find(id);

            var retEmail = new Email
            {
                EmailId = efEmail.EmailId,
                EmailAddress = efEmail.EmailAddress,
            };

            return retEmail;
        }

        public IEnumerable<Email> GetEmails()
        {
            var efEmails = _context.Emails.ToList();
            var retEmails = new List<Email>();

            foreach (var mail in efEmails)
            {
                retEmails.Add(new Email
                {
                    EmailId = mail.EmailId,
                    EmailAddress = mail.EmailAddress,
                });
            }

            return retEmails;
        }



    }

}
