export class appError extends Error{

    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
    }
}