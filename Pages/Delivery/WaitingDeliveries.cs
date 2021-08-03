using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace PortalWeb.Pages.Delivery
{
    public class WaitingDeliveries : PageModel
    {
        private readonly ILogger<WaitingDeliveries> _logger;

        public WaitingDeliveries(ILogger<WaitingDeliveries> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}