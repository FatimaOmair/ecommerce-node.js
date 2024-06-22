export const validation=(schema)=>{


    return (req,res,next)=>{
        let filterData={}
        const errorMessage=[];
        if(req.file){
            filterData ={image:req.file,...req.body,...req.params,...req.query}
        }else if(req.files){
            filterData ={...req.file,...req.body,...req.params,...req.query}

        }
        const {error}=schema.validate(filterData,{abortEarly:false});
        if(error){
            error.details.forEach(err=>{
                const key=err.context.key;

               errorMessage.push({[key]:err.message}) 
            });
           return res.status(400).json({message:"validation error",error})
        }
        next();
    }
   

  
}