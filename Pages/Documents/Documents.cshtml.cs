using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace PortalWeb.Pages.Documents
{
    public class DocumentModel : PageModel
    {
        private readonly ILogger<DocumentModel> _logger;

        public DocumentModel(ILogger<DocumentModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}
