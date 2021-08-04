using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace PortalWeb.Pages.Delivery
{
    public class ShippingDeliveries : PageModel
    {
        private readonly ILogger<ShippingDeliveries> _logger;

        public ShippingDeliveries(ILogger<ShippingDeliveries> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}