using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace PortalWeb.Pages.Delivery
{
    public class DeliveryProcess : PageModel
    {
        private readonly ILogger<DeliveryProcess> _logger;

        public DeliveryProcess(ILogger<DeliveryProcess> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}
