using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace PortalWeb.Pages.Delivery
{
    public class CanceledDeliveries : PageModel
    {
        private readonly ILogger<CanceledDeliveries> _logger;

        public CanceledDeliveries(ILogger<CanceledDeliveries> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}