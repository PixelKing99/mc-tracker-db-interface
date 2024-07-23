const db = require("../config/db");

class PlayerIndex {
    static findByPlayerId(playerId) {
        const sql = `SELECT player_id, 
        player_username, 
        LOWER( HEX( player_uuid )) as player_uuid, 
        LOWER( HEX( texture_id )) as texture_id, 
        number_of_servers 
        FROM player_index WHERE ( player_id = ? );`;

        return db.execute(sql, [playerId]);
    }

    static findByUUID(uuid) {
        const sql = `SELECT player_id, 
        player_username, 
        LOWER( HEX( player_uuid )) as player_uuid, 
        LOWER( HEX( texture_id )) as texture_id, 
        number_of_servers 
        FROM player_index WHERE ( player_uuid = UNHEX( ? ));`;

        return db.execute(sql, [uuid]);
    }

    static findByUname(username) {
        const sql = `SELECT player_id, 
        player_username, 
        LOWER( HEX( player_uuid )) as player_uuid, 
        LOWER( HEX( texture_id )) as texture_id, 
        number_of_servers 
        FROM player_index WHERE ( player_username = ? );`;

        return db.execute(sql, [username]);
    }

    static async savePlayer(username, uuid) {
        const sql = `INSERT INTO player_index(
            player_username, player_uuid
        )
        VALUES(
            ?, UNHEX( ? )
        )`;

        await db.execute(sql, [username, uuid]);

        return;
    }

    static FindAllPlayers() {
        const sql = `SELECT player_id, 
        player_username, 
        LOWER( HEX( player_uuid )) as player_uuid, 
        LOWER( HEX( texture_id )) as texture_id, 
        number_of_servers 
        FROM player_index;`;

        return db.execute(sql);
    }

    static setNumberOfServers(id, numberOfServers) {
        let sql = `update player_index set number_of_servers = ? where player_id = ?;`;
        return db.execute(sql, [numberOfServers, id]);
    }

    static deleteAll() {
        const sql = "delete from player_index";

        return db.execute(sql);
    }

    static resetAutoIncrement() {
        const sql = "ALTER TABLE player_index AUTO_INCREMENT = 0;";

        return db.execute(sql);
    }
}

module.exports = PlayerIndex;
