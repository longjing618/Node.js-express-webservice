var conf = require('./config');
var utils = require('./utils');
var json2xml = require('json2xml');
//http://toolbox.no.de/packages/json2xml

var fs = require('fs');

var jsbean = {};

jsbean.ini = function(req,res)
{
  this.req = req;
  this.res = res;
  this.exec = require('child_process').exec;
}

jsbean.module_exists = function(name)
{
  try { return require.resolve( name ) }
  catch( e ) { return false }
}

jsbean.execArray = function(arr,match)
{
  console.log(jsbean.getCurl(arr[0]));
  this.exec(jsbean.getCurl(arr[0]),{maxBuffer: conf.maxbuffer},function(err,stdout,stderr)
     {
        if(err || stdout.indexOf("ERROR")==0)
        {
          console.log("Cannot get data from js");
          console.log(err);
          data = "";
        }
        else
        {
          data = jsbean.unserialize(stdout);
        }
        match[match.length] = data;
        
        arr.splice(0,1);

        if(arr.length == 0)
        {
           if(jsbean.module_exists('./algorithm/'+jsbean.getParam('f')))
             var fun = require('./algorithm/'+jsbean.getParam('f'));
           else if(jsbean.getParam('f') != "")
             console.log("Cannot find algorithm: "+jsbean.getParam('f'));

           if(typeof fun != 'undefined')
             match = fun(match);
           jsbean.send(match,jsbean.req,jsbean.res)
        }
        else
        {
           jsbean.execArray(arr,match);
        }
     }
   );
}

jsbean.getURL= function(str)
{
   return this.getParam('host')+":"+this.getParam('port')+"/?query="+this.filterWords(str)+'&groups='+this.getParam('groups')+'&max='+this.getParam('max');
//   return conf.jshost+":"+conf.jsport+"/?query="+str+'&groups='+this.getParam('groups')+'&max='+this.getParam('max');
}

jsbean.getCurl = function(str)
{
   return 'curl --noproxy '+this.getParam('host') +' ' + this.getURL(str).replace(/&/g,"\\\&");
}

jsbean.getParam = function(param)
{
  if(typeof this.req.query[param] == 'undefined')
    return "";
  else
    return this.req.query[param];
}

jsbean.unserialize = function(data)
{
  return utils.unserialize(data);
}

jsbean.filterWords = function(str)
{
    if(typeof str=="undefined")
       return "";
    else
    {
       sw = require('./stopwords');
       str = str.replace(sw.sw,"+"); 
       str = str.replace(/[^A-Za-z0-9]/g,'+');
       return str;
    }
}

jsbean.countQuery =function(req)
{
    var matched = req.url.match(/\?query|&query/g);
    if(matched != null)
      return matched.length;
    else
      return 0;
}

jsbean.getqueryArray = function(req)
{
    var matched = new Array();
    for(var i=0;i<this.countQuery(req);i++)
    {
      if(this.getParam('query'+i) != '')
        matched[i] = this.getParam('query'+i)
    }
     return matched;
}

jsbean.json2xml = function(firstxmltag,jsondata)
{
   return json2xml.toXml(firstxmltag,jsondata);
}

jsbean.send = function(data,req,res)
{
      if(this.getParam('callback'))
      {
       // res.header('Content-Type', 'application/json');
       // res.header('Charset', 'utf-8')
        console.log(this.getParam('callback') + '('+data+')');
        res.send(this.getParam('callback') + '('+JSON.stringify(data)+')');
      }
      else if(this.getParam('xml'))
        res.send(this.json2xml('root',data));
      else
      {
        res.send(data);
      }
}
module.exports = jsbean;
