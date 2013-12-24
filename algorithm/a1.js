var utils = require('../utils');
var un = require('../underscore');
module.exports = function(data)
{
   var re = new Array();
   var cou =0;
   var total =0;
   for(var i = 0; i < data.length; i++)
     re[i] = utils.getjsonvalue(data[i],'title') 
//   return re[0];


for(i=0;i<re[0].length;i++)
{
    if(re[0][i]=='null')
       {
           cou++;
       }
    total++;
}
     
          return "ISSN  Total: "+total.toString()+"   Null: "+cou.toString(); 
};
