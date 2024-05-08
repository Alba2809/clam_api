import { pool } from "../db.js";

export class StaffModel {
  static async getAll(id) {
    const [staff] = await pool.query(
      "SELECT * FROM staff WHERE id_talento =?",
      [id]
    );

    return staff;
  }

  static async createById(id_talento, data) {
    const result = await pool.query(
      "INSERT INTO staff (id_talento, nombre_apellidos, genero, puesto, nivel, correo, telefono, fecha_nacimiento, nacionalidad, no_pasaporte) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [
        id_talento,
        data.nombre_apellidos,
        data.genero,
        data.puesto,
        data.nivel,
        data.correo,
        data.telefono,
        data.fecha_nacimiento,
        data.nacionalidad,
        data.no_pasaporte,
      ]
    );

    return result[0];
  }

  static async createByName(nombre_talento, data) {
    const [artist_id] = await pool.query(
      "SELECT id FROM talentos WHERE LOWER(nombre) COLLATE utf8mb4_general_ci = LOWER(?)",
      [nombre_talento]
    );

    if (!artist_id[0] || !artist_id[0]?.id) return null;

    const result = await pool.query(
      "INSERT INTO staff (id_talento, nombre_apellidos, genero, puesto, nivel, correo, telefono, fecha_nacimiento, nacionalidad, no_pasaporte) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [
        artist_id[0]?.id,
        data.nombre_apellidos,
        data.genero,
        data.puesto,
        data.nivel,
        data.correo,
        data.telefono,
        data.fecha_nacimiento,
        data.nacionalidad,
        data.no_pasaporte,
      ]
    );

    return result[0].insertId;
  }

  static async deleteAll(id) {
    const result = await pool.query("DELETE FROM staff WHERE id_talento =?", [
      id,
    ]);
    return result[0];
  }
}
