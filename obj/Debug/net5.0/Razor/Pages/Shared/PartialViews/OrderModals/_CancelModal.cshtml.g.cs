#pragma checksum "C:\Users\MeteARSLAN\Desktop\GitHub\NCode\PortalWeb\Pages\Shared\PartialViews\OrderModals\_CancelModal.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "789e1f2d9a654ce14c6e0eef8a96ee0fda4261c2"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(PortalWeb.Pages.Shared.PartialViews.OrderModals.Pages_Shared_PartialViews_OrderModals__CancelModal), @"mvc.1.0.view", @"/Pages/Shared/PartialViews/OrderModals/_CancelModal.cshtml")]
namespace PortalWeb.Pages.Shared.PartialViews.OrderModals
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "C:\Users\MeteARSLAN\Desktop\GitHub\NCode\PortalWeb\Pages\_ViewImports.cshtml"
using PortalWeb;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"789e1f2d9a654ce14c6e0eef8a96ee0fda4261c2", @"/Pages/Shared/PartialViews/OrderModals/_CancelModal.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"3978f1a157e64d766a792ae8987bd51df94cf392", @"/Pages/_ViewImports.cshtml")]
    public class Pages_Shared_PartialViews_OrderModals__CancelModal : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""modal fade"" id=""cancelModal"" role=""dialog"" tabindex=""-1"" data-bs-backdrop=""static"" data-bs-keyboard=""false""
    aria-labelledby=""exampleModalLabel"" aria-hidden=""true"">
    <div class=""modal-dialog"" role=""document"">
        <div class=""modal-content"">
            <div class=""modal-header"">
                <h5 class=""modal-title"" id=""exampleModalLabel"">Sipariş İptal</h5>
                <button type=""button"" class=""btn btn-secondary"" data-bs-dismiss=""modal"" aria-label=""Close"">
                    <span class=""fa fa-times""></span>
                </button>
            </div>
            <div class=""modal-body"">
                <div class=""container"">
                </div>
                <span>Neden: </span>
                <input type=""text"" id=""cancelReasonText"" />
            </div>
            <div class=""modal-footer"">
                <button type=""button"" class=""btn btn-secondary"" data-bs-dismiss=""modal"">Kapat</button>
                <button id=""cancelButton"" class=""btn btn-");
            WriteLiteral(@"sm btn-danger rounded-pill ripple-fx no-border"">
                    <span class=""btn-icon fas fa-ban""></span>
                    <span class=""btn-title"">Sipariş İptal</span>
                </button>
            </div>
        </div>
    </div>
</div>");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
