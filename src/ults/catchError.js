export const asyncHandler=(func)=>{

    
    return async(req,res,next)=>{
       try{
           return await func(req,res,next)
       }catch(error){
           return res.ststus(500).json({message:error})
       }
       
    }
   }