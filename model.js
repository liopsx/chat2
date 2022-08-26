const { mongoose}= require('mongoose')
const UserScheme= new mongoose.Schema(
    {    
       id_cliente:{
        type: String , required:true
       },
       mensaje:{
        type: String , required:true
       }
    },
   
   
    {
        timestamps: true
        }
    
)
module.exports = mongoose.model('mensajes',UserScheme);