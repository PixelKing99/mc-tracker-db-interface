const db = require("../config/db");

class Server {
    static async save(serverName, serverIp, serverPort, pingInterval) {
        // the coalesce and nullif stuff just makes it so if you input null as string into the command it will use the default value defined in sql for that parameter
        const sql = `INSERT INTO servers(server_display_name, server_ip, server_port, ping_interval)
        VALUES( 
        COALESCE( ?, DEFAULT(server_display_name) ), 
        ?, 
        COALESCE( ?, DEFAULT(server_port) ), 
        COALESCE( ?, DEFAULT(ping_interval) ) 
        )`;

        await db.execute(sql, [serverName, serverIp, serverPort, pingInterval]);

        return;
    }

    static findAll() {
        let sql = "SELECT * FROM servers";
        return db.execute(sql);
    }

    static findTracked() {
        let sql = "SELECT * FROM servers WHERE being_tracked = 1";
        return db.execute(sql);
    }

    static findById(id) {
        let sql = `SELECT * FROM servers WHERE server_id = ? ;`;
        return db.execute(sql, [id]);
    }

    static setTracking(id, tracked) {
        let sql = `update servers set being_tracked = ? where server_id = ?;`;
        return db.execute(sql, [tracked, id]);
    }

    static setInterval(id, interval) {
        let sql = `update servers set ping_interval = ? where server_id = ?;`;
        return db.execute(sql, [interval, id]);
    }

    static findByIpAddress(ip) {
        const sql = `SELECT * FROM servers WHERE ( server_ip = ? );`;
        return db.execute(sql, [ip]);
    }

    static setTrueIp(trueIp, id) {
        let sql = `update servers set true_ip = ? where server_id = ?;`;
        return db.execute(sql, [trueIp, id]);
    }

    static setFormatLabel(formatLabel, id) {
        let sql = `update servers set format_label = ? where server_id = ?;`;
        return db.execute(sql, [formatLabel, id]);
    }
}

module.exports = Server;
