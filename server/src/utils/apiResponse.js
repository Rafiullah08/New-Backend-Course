class ApiResponse {
    constructor(
        statusCode,
        data,
        message = "success",
        
    ){
        this.statusCode = statusCode,
        this.data = data,
        this.message = "success"
        this.success = statusCode < 400
    }
}

export default ApiResponse