const mongoose= require('mongoose')
//mongodb://estudiante:12345@172.16.50.164/prueba/?authMechanism=DEFAULT
//const DB_URI=`mongodb://DESKTOP-1OLE3UD/chaton`
const DB_URI=`mongodb://192.168.10.34:27017/chaton`

module.exports = () => {
   const connect = () => {
    mongoose.connect(
        DB_URI,
        {
            keepAlive: true,
            useNewUrlParser: true,
            useUnifiedTopology:true
        },
        (err)=>{
            if(err){
                console.log(" error no se pudo conectar");
            }else{
                console.log("conexion correcta")
            }
        }
    )
   }
   connect();
}