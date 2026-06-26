export class ApiError extends Error{
    statusCode:number;
    errors:any[] ;
    success:boolean ;
    data:null ;

    constructor(statusCode:number,
    message:string = "something went wrong",
    errors:any[] ,
    success:boolean, 
    data:null,
stack:string = ""){
        super(message);
        this.statusCode = statusCode;
        this.errors = errors ;
        this.success = success ;
        this.data = null;

        if(stack){
            this.stack = stack;
        }else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}