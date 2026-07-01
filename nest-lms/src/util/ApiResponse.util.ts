export class ApiResponse {

    success : boolean;
    statusCode:number;
    message:string;
    data:[];
    
    constructor(statusCode:number, message:string = "successful", data:any){
        this.statusCode = statusCode;
        this.success = statusCode < 400;
        this.message = message;
        this.data = data;
    }
}
