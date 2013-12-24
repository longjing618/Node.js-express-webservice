var utils = require('../utils');


module.exports = function(stdout)
{

   re = utils.getjsonvalue(stdout,'impact_factor') 
   return re[0];
};
