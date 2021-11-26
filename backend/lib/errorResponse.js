// adjust the JSON response coming from the error object
module.exports = {
    'errorResponse': function (errorObj) {
    this.HTTP=errorObj.httpCode;
    this.MESSAGE = errorObj.httpMessage;
    this.DESCRIPTION = errorObj.description;
    this.DETAILS = errorObj.details ? errorObj.details:null;
   },
  };