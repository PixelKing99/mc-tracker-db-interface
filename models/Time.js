const db = require("../config/db");

class Time {
    constructor() {
        let d = new Date();
        let hours = d.getUTCHours();
        this.minutes = d.getUTCMinutes();
        let seconds = d.getUTCSeconds();
        this.currentTime = `${hours}:${this.minutes}:${seconds}`;
    }

    static findByServerDateTimeId(serverDateTimeId) {
        const sql = `SELECT * FROM gathered_times WHERE ( server_date_time_id = ? );`;

        return db.execute(sql, [serverDateTimeId]);
    }

    static findByServerDateID(serverDateId) {
        const sql = `SELECT * FROM gathered_times WHERE ( server_date_id = ? );`;

        return db.execute(sql, [serverDateId]);
    }

    async saveCurTime(serverDateId, format, online) {
        const sql = `INSERT INTO gathered_times(
            server_date_id, gather_time, format, online
        )
        VALUES(
            ?, ?, ?, ?
        )`;

        await db.execute(sql, [serverDateId, this.currentTime, format, online]);

        return;
    }

    static async saveTime(serverDateId, time, format, online) {
        const sql = `INSERT INTO gathered_times(
            server_date_id, gather_time, format, online
        )
        VALUES(
            ?, ?, ?, ?
        )`;

        await db.execute(sql, [serverDateId, time, format, online]);

        return;
    }

    static findByServerDateId_Time(serverDateId, time) {
        let sql = `SELECT * FROM gathered_times WHERE ( server_date_id = ? AND gather_time = ? );`;

        return db.execute(sql, [serverDateId, time]);
    }

    static deleteAll() {
        const sql = "delete from gathered_times";

        return db.execute(sql);
    }

    static resetAutoIncrement() {
        const sql = "ALTER TABLE gathered_times AUTO_INCREMENT = 0;";

        return db.execute(sql);
    }
}

module.exports = Time;
