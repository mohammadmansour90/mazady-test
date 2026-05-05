const errorHandler = (eer , req , res , next ) => {
    const statusCode = res.statusCode ? res.statusCode :500 ;
    res.status(statusCode);


    res.json({
        message:eer.message ,
        stack: process.env.NODE_ENV === "development" ? eer.stack :null ,
    });
};


module.exports=errorHandler;