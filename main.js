

const https = require('https');
const httpsGoogle = require('https');
let zipCode = 243006;
let lattitude = 0;
let longitude= 0;

const latlong = httpsGoogle.get('https://maps.googleapis.com/maps/api/geocode/json?address=${zipCode}', response => {

  let info="";
    response.on('data', data=>{
      
        info+=data.toString();      
     
    });
  
  
    response.on('end', (data) =>{
         const profile = JSON.parse(info);
         lattitude = profile.results[0].geometry.location.lat;
         longitude = profile.results[0].geometry.location.lng;
      
      console.log(lattitude);
      console.log(longitude);
      
      printMessage(profile.results[0].geometry.location.lat, profile.results[0].geometry.location.lng);
});
      
      


} )

function printMessage( a , b){

        const request = https.get(`https://api.darksky.net/forecast/08a6ef07c3456dce0fcbcbd4b83f318b/${a},${b}`, response => {
  
  let body= "";
  
  response.on('data', data => {
    body+= data.toString();
  });

  response.on('end', () =>{
   
        body = JSON.parse(body)
        console.dir(body.currently);
   });
  
 });
}



