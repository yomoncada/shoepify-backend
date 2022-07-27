class UserDTO {
    constructor(object, id) {
        if (id) {
            object.id = id;
            delete object._id;
        }

        Object.assign(this, object);

        this.createdAt = object.createdAt || Date.now();
        this.updatedAt = Date.now();
    }
}

module.exports = UserDTO;