import { pool } from "../db.js";

export class ArtistModel {
  static async getAll() {
    const [artists] = await pool.query(
      "SELECT * FROM talentos WHERE estado = 'Activo'"
    );

    return artists;
  }

  static async getById(id) {
    const [artistFound] = await pool.query(
      "SELECT * FROM talentos WHERE id = ? AND estado = 'Activo'",
      [id]
    );

    return artistFound[0];
  }

  static async getByName(name) {
    const [artistFound] = await pool.query(
      "SELECT * FROM talentos WHERE LOWER(nombre) COLLATE utf8mb4_general_ci = LOWER(?) AND estado = 'Activo'",
      [name]
    );

    return artistFound[0];
  }

  static async create(input) {
    const result = await pool.query(
      "INSERT INTO talentos (nombre,tipo,genero,semblanza,foto,video,costo_artista,costo_produccion,comision_evento,comision_intermediario) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [
        input.nombre,
        input.tipo,
        input.genero,
        input.semblanza,
        input.foto,
        input.video,
        input.costo_artista,
        input.costo_produccion,
        input.comision_evento,
        input.comision_intermediario,
      ]
    );

    return result[0];
  }

  static async update(input, id) {
    const result = await pool.query(
      "UPDATE talentos SET nombre = ?, tipo = ?, genero = ?, semblanza = ?, foto = ?, video = ?, costo_artista = ?, costo_produccion = ?, comision_evento = ?, comision_intermediario = ? WHERE id = ?",
      [
        input.nombre,
        input.tipo,
        input.genero,
        input.semblanza,
        input.foto,
        input.video,
        input.costo_artista,
        input.costo_produccion,
        input.comision_evento,
        input.comision_intermediario,
        id,
      ]
    );

    return result[0];
  }

  static async updateDateById(id){
    const result = await pool.query(
      "UPDATE talentos SET updatedAt = CURRENT_TIMESTAMP WHERE id = ?",
      [id]
    );

    return result[0];
  }

  static async updateDateByName(name){
    const result = await pool.query(
      "UPDATE talentos SET updatedAt = CURRENT_TIMESTAMP WHERE LOWER(nombre) COLLATE utf8mb4_general_ci = LOWER(?)",
      [name]
    );

    return result[0];
  }

  static async delete(id) {
    const result = await pool.query("DELETE FROM talentos WHERE id = ?", [id]);

    return result[0];
  }

  static async inactive(id) {
    const result = await pool.query(
      "UPDATE talentos SET estado = 'Inactivo' WHERE id = ?",
      [id]
    );

    return result[0];
  }
}
