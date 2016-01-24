var express = require('express');
var router = express.Router();


/* POST home page. */
router.post('/', function(req, res)  {
            var query = req.body.query;
            if(query=="sine") {
                
               // var refreshIntervalId=null;
                var t=0;
                var arDrone = require('ar-drone');
                var control = arDrone.createUdpControl();
                var ref  = {};
                var pcmd = {};
            
                ref.emergency = true;
                ref.fly       = true;
            
            setTimeout(function() {
                    console.log('Recovering from emergency mode if there was one ...');
                    ref.emergency=false;
                    }, 1000);
            
            setInterval(function() {
                    console.log('Moving sinusoidally');
                    control.ref(ref);
                    
                    t+=.5;
                    pcmd.front = t;
                    if(Math.sin(t)>=0) {    
                        pcmd.up=5*Math.sin(t/2.5);
                        pcmd.down=0;
                    } else {
                        pcmd.down=5*Math.sin(t/2.5);
                        pcmd.up=0;
                    }
                    
                    control.pcmd(pcmd);
                    control.flush();
                }, 250);
            
            setTimeout(function() {
                ref.fly = false;
                pcmd = {};
                console.log('Landing ...');
                }, 16000);
                
                 
            }
});
                      
module.exports = router;