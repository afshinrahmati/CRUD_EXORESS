// src/utils/apiResponse.js
export default class ApiResponse {
  constructor(statusCode, message, data = null) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  static success(data, message = 'Success') {
    return new ApiResponse(200, message, data);
  }

  static created(data, message = 'Created') {
    return new ApiResponse(201, message, data);
  }

  static error(statusCode, message) {
    return new ApiResponse(statusCode, message);
  }
}
