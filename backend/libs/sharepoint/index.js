import { sp } from "@pnp/sp"
import { SPFetchClient } from "@pnp/nodejs"

import { from } from "rxjs";
import { map } from "rxjs/operators"

const config = {
    siteUrl: "",
    clientId: "14bfd1f2-b9af-45e1-9ebe-2378ce17727a",
    tenantId: "bc924c8d-3e16-4e88-bf26-d7fcfb14f2d5",
    objectId: "4e4466b1-77af-4e80-9751-11829d194610",
    clientSecret: "EGGIhwKAfd4JLCocEiK5l/uoJEAa9MkAzoIR8ZE2A0Q=",
    appIdUri: "https://Gannett.onmicrosoft.com/88676ed4-b71f-4ee5-8dc1-a0a6639f8122",
    enpoints: {
        "FEDERATION METADATA DOCUMENT" : "https://login.microsoftonline.com/bc924c8d-3e16-4e88-bf26-d7fcfb14f2d5/federationmetadata/2007-06/federationmetadata.xml",
        "WS-FEDERATION SIGN-ON ENDPOINT" : "https://login.microsoftonline.com/bc924c8d-3e16-4e88-bf26-d7fcfb14f2d5/wsfed",
        "SAML-P SIGN-ON ENDPOINT" : "https://login.microsoftonline.com/bc924c8d-3e16-4e88-bf26-d7fcfb14f2d5/saml2",
        "SAML-P SIGN-OUT ENDPOINT" : "https://login.microsoftonline.com/bc924c8d-3e16-4e88-bf26-d7fcfb14f2d5/saml2",
        "MICROSOFT AZURE AD GRAPH API ENDPOINT" : "https://graph.windows.net/bc924c8d-3e16-4e88-bf26-d7fcfb14f2d5",
        "OAUTH 2.0 TOKEN ENDPOINT" : "https://login.microsoftonline.com/bc924c8d-3e16-4e88-bf26-d7fcfb14f2d5/oauth2/token",
        "OAUTH 2.0 AUTHORIZATION ENDPOINT" : "https://login.microsoftonline.com/bc924c8d-3e16-4e88-bf26-d7fcfb14f2d5/oauth2/authorize"
    }
}
sp.setup({
    sp: {
        fetchClientFactory: () => {
            return new SPFetchClient(`https://gannett.sharepoint.com/sites/CMS/SitePages/Home.aspx`, `${config.clientId}`, `${config.clientSecret}`)
            // return new SPFetchClient(`${config.siteUrl}`, `${config.clientId}`, `${config.clientSecret}`)
        }
    }
})


// export function webSelect$(title, description) {
//     return from(sp.web.select(title, description).get())
//         .pipe(
//             map(res => JSON.stringify(res, null, 4))
//         )
// }

sp.web.select("Title", "Description").get().then(w => {
    console.log(JSON.stringify(w, null, 4));
});
