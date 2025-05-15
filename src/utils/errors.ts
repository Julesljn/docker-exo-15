class ApiError extends Error {
	public status = 0;

	constructor(message: string, status: number) {
		super(message);

		this.status = status;
	}
}

export class AuthPermissionTokenError extends ApiError {
	constructor(message = "Insufficient permissions", status = 403) {
		super(message, status);
	}
}

export class AuthInvalidTokenError extends ApiError {
	constructor(message = "Invalid signature", status = 403) {
		super(message, status);
	}
}

export class AuthTokenExpiredError extends ApiError {
	constructor(message = "Expired token", status = 403) {
		super(message, status);
	}
}

export class AuthMissingTokenError extends ApiError {
	constructor(message = "Unauthorized", status = 403) {
		super(message, status);
	}
}

export class AuthMissingSessionError extends ApiError {
	constructor(message = "Unauthorized missing session", status = 403) {
		super(message, status);
	}
}

export class QueryError extends ApiError {
	constructor(message: string, status = 400) {
		super(message, status);
	}
}

export class ServerError extends ApiError {
	constructor(message: string, status = 500) {
		super(message, status);
	}
}

export class QueryFieldError extends QueryError {
	constructor(message = "Missing field") {
		super(message, 400);
	}
}

export class QueryFoundError extends QueryError {
	constructor(message = "Not found") {
		super(message, 404);
	}
}

export class QueryMethodError extends QueryError {
	constructor(message = "Method not allowed") {
		super(message, 405);
	}
}

export class QueryAcceptError extends QueryError {
	constructor(message = "Not Acceptable") {
		super(message, 406);
	}
}

export class QueryUnauthorizedError extends QueryError {
	constructor(message = "Unauthorized") {
		super(message, 401);
	}
}

export class QueryTimeoutError extends QueryError {
	constructor(message = "Request timed-out") {
		super(message, 406);
	}
}

export class ServerIntervalError extends ServerError {
	constructor(message = "Internal error") {
		super(message, 500);
	}
}

export class ServerUnavaiblableError extends ServerError {
	constructor(message = "Service Unavailable") {
		super(message, 503);
	}
}

export class ServerUnknowError extends ServerError {
	constructor(message = "Unknown Error") {
		super(message, 520);
	}
}
