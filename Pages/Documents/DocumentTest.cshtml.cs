using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace PortalWeb.Pages.Documents
{
    public class DocumentTestModel : PageModel
    {
        private readonly ILogger<DocumentTestModel> _logger;

        public DocumentTestModel(ILogger<DocumentTestModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}
