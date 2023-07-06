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

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "ServerError";
  }
}




export {
  RefreshTokenMissingError,
  BadRequestError,
  ServerError,
}