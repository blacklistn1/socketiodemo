function Message(username, text) {
    this.username = username;
    this.text = text;
    this.time = `${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}`;
}

module.exports = Message;