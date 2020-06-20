class User{    
    constructor(id, username, hash) {
        if(id)
            this.id = id;
        this.username = username;
        this.hash = hash;
    }
}

module.exports = User;