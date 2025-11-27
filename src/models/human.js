class human {
    constructor() {
        this.id = Date.now(); // Tự sinh ID
        this.createdAt = new Date();
    }

  // Phương thức để Class con ghi đè (Đa hình)
    getDescription() {
        return `Base Entity ID: ${this.id}`;
    }
}
module.exports = human;
