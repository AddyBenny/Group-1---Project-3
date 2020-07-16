function printName(){
d3.json("http://localhost:4545/").then(function(data){
       console.log(data);


       
   });
}


printName();