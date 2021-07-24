using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace PortalWeb.Pages
{
    public class SuspendedOrders : PageModel
    {
        private readonly ILogger<SuspendedOrders> _logger;

        public SuspendedOrders(ILogger<SuspendedOrders> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}
