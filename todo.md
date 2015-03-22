#Modules#
+ Lodash
+ node-cache (? - is there a better option?)
+ xml2js
+ q promises
+ request

#User Flow#
1. Initialize with User Agent info
2. Get a client with your keys
3. Make your calls, get promises


```
var eo = require('eo')({email: 'test@test.com'}); //optionally choose cache
var client = new eo.client({key: '123', vkey: 'abc'});
```

#Requirements to initialize#
1. At the very least, a valid email for an operator
2. Probably a good idea to include an app name

##Clients##
1. Should probably have keys, but public access is *technically* a thing

#Questions#
1. Fixed URLs or open types?
2. Allow cache clearing? - yes but throw warning

#Actual To do#
1. Promises
2. Verbose methods - char.getWallet().success(....
2. Allow user to set cache backend
3. Docs
