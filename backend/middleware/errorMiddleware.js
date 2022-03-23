const errorMiddleware = (err, _, res) => {
    return res.status(res.statusCode ?? 500).json(
        Object.assign(
            {
                message: err.message,
            },
            process.env.NODE_ENV === 'development' ? { stack: err.stack } : {},
        ),
    );
};

module.exports = errorMiddleware;
