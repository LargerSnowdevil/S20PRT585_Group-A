using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InStock._BLL.Models;
using InStock._BLL.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InStock.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        private readonly IMailServiceBll mailService;
        public MailController(IMailServiceBll mailRequest)
        {
            mailService = mailRequest;
        }
        [HttpPost("send")]
        public async Task<IActionResult> SendEmailAsync([FromForm] MailRequestBll request)
        {
            try
            {
                await mailService.SendEmailAsync(request);
                return Ok();
            }
            catch (Exception)
            {
                throw;
            }

        }
    }
}
