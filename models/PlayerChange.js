const db = require("../db");

class PlayerChange {
    static findByServerDateTimeId(serverDateTimeId) {
        const sql = `SELECT * FROM player_changes WHERE ( server_date_time_id = ? );`;

        return db.execute(sql, [serverDateTimeId]);
    }

    static findByServerDateTimeId_playerId(serverDateTimeId, playerId) {
        const sql = `SELECT * FROM player_changes WHERE ( server_date_time_id = ? AND player_id = ? );`;

        return db.execute(sql, [serverDateTimeId, playerId]);
    }

    static async save(serverDateTimeId, playerId, joinedLeft) {
        const sql = `INSERT INTO player_changes(
            server_date_time_id, player_id, joined_left
        )
        VALUES(
            ?, ?, ?
        )`;

        await db.execute(sql, [serverDateTimeId, playerId, joinedLeft]);

        return;
    }

    static deleteAll() {
        const sql = "delete from player_changes";

        return db.execute(sql);
    }
}

module.exports = PlayerChange;
