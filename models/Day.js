const db = require("../config/db");

class Day {
    constructor() {
        let d = new Date();
        let yyyy = d.getUTCFullYear();
        let mm = d.getUTCMonth() + 1; // they start at zero so have to add one
        let dd = d.getUTCDate();
        this.currentDate = `${yyyy}-${mm}-${dd}`;
    }

    static allFromServerId(serverId) {
        const sql = `SELECT * FROM gathered_days WHERE ( server_id = ? );`;

        return db.execute(sql, [serverId]);
    }

    async saveCurDate(serverId) {
        const sql = `INSERT INTO gathered_days(
            server_id, gather_date
        )
        VALUES(
            ?, ?
        )`;

        await db.execute(sql, [serverId, this.currentDate]);

        return;
    }

    findByServerId_CurDate(serverId) {
        const sql = `SELECT * FROM gathered_days WHERE ( server_id = ? AND gather_date = ? );`;

        return db.execute(sql, [serverId, this.currentDate]);
    }

    static async saveDate(serverId, date) {
        const sql = `INSERT INTO gathered_days(
            server_id, gather_date
        )
        VALUES(
            ?, ?
        )`;

        await db.execute(sql, [serverId, date]);

        return;
    }

    static findByServerId_Date(serverId, date) {
        const sql = `SELECT * FROM gathered_days WHERE ( server_id = ? AND gather_date = ? );`;

        return db.execute(sql, [serverId, date]);
    }

    static findByServerDateId(serverDateId) {
        const sql = `SELECT * FROM gathered_days WHERE ( server_date_id = ? );`;

        return db.execute(sql, [serverDateId]);
    }

    static findByServerDateIdFull(serverDateId) {
        // blob of text lol
        const sql = `select gathered_times.server_date_id,
        format,
        gather_time, 
        gathered_times.server_date_time_id,
        joined_left,
        player_id
        from gathered_times
        left join player_changes on gathered_times.server_date_time_id = player_changes.server_date_time_id
        where ( gathered_times.server_date_id = ? ) 
        order by gather_time;`;

        return db.execute(sql, [serverDateId]);
    }

    static findPlayerByServerDateIdFull(serverDateId, playerId) {
        const sql = `select gathered_times.server_date_id,
        format,
        gather_time, 
        gathered_times.server_date_time_id,
        joined_left,
        player_id
        from gathered_times
        left join player_changes on gathered_times.server_date_time_id = player_changes.server_date_time_id
        where ( gathered_times.server_date_id = ? AND player_changes.player_id = ? ) 
        order by gather_time;`;

        return db.execute(sql, [serverDateId, playerId]);
    }

    static deleteAll() {
        const sql = "delete from gathered_days";

        return db.execute(sql);
    }

    static resetAutoIncrement() {
        const sql = "ALTER TABLE gathered_days AUTO_INCREMENT = 0;";

        return db.execute(sql);
    }
}

module.exports = Day;
