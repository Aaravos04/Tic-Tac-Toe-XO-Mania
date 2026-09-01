import playerStatus from "../constants/playerStatus.js";

class Player {
    constructor(socketID) {
        this.socketID = socketID;
        this.status = playerStatus.CONNECTED;
        this.score = 0;
        
        this.symbol = null;
        this.disconnectTimer = null;
        this.rematch = false;
    }
}

export default Player;