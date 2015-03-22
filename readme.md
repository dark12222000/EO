#EO.js#
##A pretty eve online api client##

+ Automatic Caching, configurable to use Redis, Mongo or anything else that uber-cache supports
+ Promise Based
+ Returns JSON, not XML like the original api

This is still under construction, so most of these features are either missing or incomplete.

#Basic Usage#

```
var EO = require('../lib/eo.js')({email: 'myemailwhereIcanbereached@somewhere.com'});
var myChar = EO.character({keyID: 'somekeyid', vCode: 'supersecretkeycode'});
```

Your keyID and vCode come from your Eve API keys. You can create new ones here:
(https://community.eveonline.com/support/api-key/)[https://community.eveonline.com/support/api-key/]

#Why do you require an Email Address?#

The API client does everything it can to obey api limits, caching, expiration and so on. However, it's possible to still make bad choices and hammer the API. In case that occurs, we include your email address in the user agent string when we make requests (per API docs). That way CCP can email you and tell you to knock it off. 
