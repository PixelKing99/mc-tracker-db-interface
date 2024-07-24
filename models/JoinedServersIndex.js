const db = require("../db");

class JoinedServersIndex {
    static findByPlayerId(playerId) {
        const sql = `SELECT player_id, server_id FROM joined_servers_index WHERE ( player_id = ? );`;

        return db.execute(sql, [playerId]);
    }

    static findByServerId(serverId) {
        const sql = `SELECT player_id, server_id FROM joined_servers_index WHERE ( server_id = ? );`;

        return db.execute(sql, [serverId]);
    }

    static findByPlayerId_ServerId(playerId, serverId) {
        const sql = `SELECT player_id, server_id FROM joined_servers_index WHERE ( player_id = ? AND server_id = ? );`;

        return db.execute(sql, [playerId, serverId]);
    }

    static async save(playerId, serverId) {
        const sql = `INSERT INTO joined_servers_index(
            player_id, server_id
        )
        VALUES(
            ?, ?
        )`;

        await db.execute(sql, [playerId, serverId]);

        return;
    }

    static deleteAll() {
        const sql = "delete from joined_servers_index";

        return db.execute(sql);
    }
}

module.exports = JoinedServersIndex;
