class PasswordError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, PasswordError.prototype);
    }
}

export { PasswordError }