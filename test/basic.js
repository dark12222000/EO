var EO = require('../lib/eo.js')({email: 'grimd.666+eve@gmail.com'});
var myChar = EO.character({keyID: '4189233', vCode: 'gNeHij6pXeSRPWsvVhd4THm015g6UAmNhYDOVpYitMgx2If7sK6SdgPDg9FfxxPB'});
myChar.fetchEndpoint('/account/APIKeyInfo.xml.aspx', function(body){
  console.log(body);
});
