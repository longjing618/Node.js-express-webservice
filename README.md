This is a webservice infrastructure writen with node.js express framework.

To run the webservice, please put it into the node.js folder and run "node app.js"

Here is the brief description of the files/folders.

config.js
We can set the hostname and port os the remote machine from which we want to query data.

algorithm
We can put all algorithms used to analyse the data get from the remote server into this folder. The "data" variable contains all query resultwith jason format and we can use "utils.getjsonvalue" function to get value with key name.

utils.js
This file contains the utility.

jsbean.js
This file contains the wrap of the functions and logic of the webservice.
