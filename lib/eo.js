var request = require('request');
var xml2js = require('xml2js').parseString;

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

  this.fetchEndpoint = function(endpoint, callback){
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
      console.log('REQUEST RETURN', error, body);
      if(error){
        return null;
        console.log('ERROR GETTING ENDPOINT');
      }
      xml2js(body, function(error, result){
        console.log('XML2JS', error, result);
        if(error){
          return null;
          console.log('ERROR ')
        }
        callback(result);
      });
    });

  };
}

module.exports = function(config){
  return new EO(config);
};
