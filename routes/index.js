
var jsbean = require('../jsbean');

exports.index = function(req, res){
//  res.render('index', { title: 'Edanz' });
    jsbean.ini(req,res);
//    res.send(jsbean.getqueryArray(req));
    var arr = jsbean.getqueryArray(req);
    var match = new Array();
    jsbean.execArray(arr,match);
//    res.send(match[0].toString());
};

exports.route1 = function(req,res)
{
    jsbean.exec(jsbean.getCurl(req),function(err,stdout,stderr)
    {
      console.log(jsbean.getCurl(req));
      if(err || stdout.indexOf("ERROR")==0)
      {
         console.log("Cannot get data from js");
         console.log(err);
         data = "";
      }
      else
      data = jsbean.unserialize(stdout);
      var fun = jsbean.getParam(req,'f');
      if(typeof al[fun] != 'undefined')
      {
        data = al[fun](data);
      }
      else if(fun != "")
        console.log("Cannot find algorithm: "+fun);

      jsbean.send(data,req,res);
    }
  );
}

