using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace PortalWeb.Pages
{
    public class CanceledOrders : PageModel
    {
        private readonly ILogger<CanceledOrders> _logger;

        public CanceledOrders(ILogger<CanceledOrders> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}
