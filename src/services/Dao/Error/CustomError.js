import EErrors from "./errors-enum.js";

    export default class CustomError extends Error {
        constructor(name = "Error", cause, message, code = EErrors.INVALID_TYPES_ERROR) {
          super(message);
          this.name = name;
          this.cause = cause;
          this.code = code;
        }
      }
    
