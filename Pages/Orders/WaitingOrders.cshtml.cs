using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace PortalWeb.Pages.Orders
{
    public class WaitingOrders : PageModel
    {
        private readonly ILogger<WaitingOrders> _logger;

        public WaitingOrders(ILogger<WaitingOrders> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}
