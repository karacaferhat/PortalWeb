using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace PortalWeb.Pages.Delivery
{
    public class PreparingDeliveries : PageModel
    {
        private readonly ILogger<PreparingDeliveries> _logger;

        public PreparingDeliveries(ILogger<PreparingDeliveries> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}