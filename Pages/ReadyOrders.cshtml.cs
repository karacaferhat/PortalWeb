using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace PortalWeb.Pages
{
    public class ReadyOrders : PageModel
    {
        private readonly ILogger<ReadyOrders> _logger;

        public ReadyOrders(ILogger<ReadyOrders> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}
