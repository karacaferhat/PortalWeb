using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace PortalWeb.Pages.Documents
{
    public class QualityDocument : PageModel
    {
        private readonly ILogger<QualityDocument> _logger;

        public QualityDocument(ILogger<QualityDocument> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}
