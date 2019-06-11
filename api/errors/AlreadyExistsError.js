class AlreadyExistsError extends Error {
    constructor(entityName) {
        super();
        this.entityName = entityName;
    }
}

module.exports = AlreadyExistsError;
