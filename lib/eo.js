var request = require('request');
var xml2js = require('xml2js').parseString;
var q = require('q');
var uber = require('uber-cache');

var cache = new uber();

function EO(config){
  this.agent = 'EO.js v.0.1-ALPHA'
  this.characters = [];

  if(!config.email){
    throw new Error('No Email Provided');
  }
  //@TODO Convert this to be a template string
  this.email = config.email;
  this.agent = config.email + ' ' + this.agent;

  this.character = function(config){
    if(!this.email){
      throw new Error('Not initialized');
    }
    var char = new Character(config, this.agent);
    this.characters.push(char);
    return char;
  };

}

function Character(config, agent){
  this.api = {
    keyID: config.keyID || '',
    vCode: config.vCode || '',
    baseUrl: config.baseUrl || 'https://api.eveonline.com',
    agent: agent || 'EO.js NO AGENT PROVIDED'
  };

  //checks cache, then forwards on to requesting via api
  this.fetchEndpoint = function(endpoint){
    var _this = this;

    var promise = q.defer();
    
    cache.get(this.keyID + endpoint, function(err, cached){
      if(err || !cached){
        //No cache, go ahead and request
        _this.requestEndpoint(endpoint, function(err, result){
          //result is a javascript object
          try {
            json_data = JSON.stringify(result);
          }catch(e){
            callback('Failed to stringify response; response might be bad;', null);
            return;
          }

          var ttl = 5 * 60 * 60; //define our default TTL - 5 minutes
          if(result && result.currentTime && result.currentTime[0] &&
            result.cachedUntil && result.cachedUntil[0]){
            //@TODO handle timezones
            var cached = new Date(result.cachedUntil[0]);
            var now = new Date(result.currentTime[0]);

            ttl = Math.floor((cached.getTime() - now.getTime())/1000); //seconds
          }
          cache.set(this.keyID + endpoint, json_data, ttl, function(err, cache_result){
            if(err){
              callback('Failed to cache value', json_data);
              return;
            }else{
              callback(null, json_data);
              return;
            }
          });

        });
      }else{ //ok, we got a result
        callback(null, cached);
        return;
      }
    });
  };

  //responsible for making a straight API call
  this.requestEndpoint = function(endpoint, callback){
    var params = [];
    params['keyID'] = this.api.keyID;
    params['vCode'] = this.api.vCode;

    var options = {
      url: this.api.baseUrl + endpoint,
      headers: {
        'User-Agent':this.api.agent
      },
      useQueryString: true,
      qs: params
    };

    request.get(options, function(error, response, body){
      if(error){
        callback(error, null);
        return;
      }
      xml2js(body, function(error, result){
        result = result.eveapi;
        if(error){
          callback(error, null);
          return;
        }
        callback(null, result);
        return;
      });
    });
  };
}

module.exports = function(config){
  return new EO(config);
};
