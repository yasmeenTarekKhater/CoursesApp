class AppError extends Error{
    constructor(){
        super();
    }

    create(mseeage,statusCode,statusText){
        this.message=mseeage;
        this.statusCode=statusCode;
        this.statusText=statusText;
    }
}
module.exports=new AppError();