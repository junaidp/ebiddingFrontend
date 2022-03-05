export default {
    oidc: {
        clientId: '0oa3wul8xbQhbH1sj5d7',
        issuer: 'https://dev-31845445.okta.com/oauth2/default',
        //redirectUri: 'www.google1.de',
        //redirectUri: 'https://821d-101-50-88-15.ngrok.io/loginOkta',
        //redirectUri: window.location.origin + '/e-bidding',
        redirectUri: 'http://localhost:4200/e-project',
        scope: ['openid', 'profile', 'email']
    }


    // const config = {
    //     issuer: 'https://{yourOktaDomain}/oauth2/default',
    //     clientId: '{clientId}',
    //     redirectUri: window.location.origin + '/login/callback'
    //   }
}