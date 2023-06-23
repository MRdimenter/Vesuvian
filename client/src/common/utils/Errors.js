class RefreshTokenMissingError extends Error {
    constructor(message) {
      super(message);
      this.name = "RefreshTokenMissingError";
    }
  }

class BadRequestError extends Error {
    constructor(message) {
      super(message);
      this.name = "BadRequestError";
    }
  }

  

export {
    RefreshTokenMissingError,
    BadRequestError,
}