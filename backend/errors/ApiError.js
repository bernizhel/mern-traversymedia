class ApiError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }

    static badRequest(message) {
        return new ApiError(400, message);
    }

    static badRequestTextField() {
        return new ApiError(400, 'Text field not applied');
    }

    static badRequestUserFields(body, fields) {
        fields = fields.filter((i) => !body[i]);
        let fieldsString = fields.join(', ');
        fieldsString = fieldsString[0].toUpperCase() + fieldsString.slice(1);
        const message =
            fieldsString + ` field${fields.length > 1 ? 's' : ''} not applied`;
        return new ApiError(400, message);
    }

    static badRequestUserFieldsInvalid() {
        return new ApiError(400, 'Invalid user data');
    }

    static unauthorized(message = 'Unauthorized') {
        return new ApiError(401, message);
    }

    static unauthorizedAuthorizationHeader() {
        return new ApiError(401, 'Authorization header not applied');
    }

    static unauthorizedAuthorizationHeaderInvalid() {
        return new ApiError(401, 'Authorization header corrupted');
    }

    static unauthorizedToken() {
        return new ApiError(401, 'Token not applied');
    }

    static unauthorizedUser() {
        return new ApiError(401, 'User not found');
    }

    static notFound(message) {
        return new ApiError(404, message);
    }

    static notFoundGoal() {
        return new ApiError(404, 'Goal not found for this user');
    }

    static notFoundUrl() {
        return new ApiError(404, 'API endpoint does not exist');
    }

    static alreadyExists(message) {
        return new ApiError(409, message);
    }

    static alreadyExistsUser() {
        return new ApiError(409, 'User already exists');
    }

    static internal(message) {
        return new ApiError(500, message);
    }

    static databaseError() {
        return new ApiError(500, 'Database query corrupted');
    }
}

module.exports = { ApiError };
