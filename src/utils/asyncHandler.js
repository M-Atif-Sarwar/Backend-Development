const asyncHandler=(fn)=>{
    return (req,res,next)=>{
        Promise.resolve('success').catch((err)=>{next(err)})
    }
}