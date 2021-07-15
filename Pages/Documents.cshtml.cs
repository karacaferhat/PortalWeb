using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace PortalWeb.Pages
{
    public class OrdersModel : PageModel
    {
        private readonly ILogger<OrdersModel> _logger;

        public OrdersModel(ILogger<OrdersModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}
