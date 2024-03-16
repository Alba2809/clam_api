import { pool } from "../db.js";

export class ArtistModel {
  static async getAll() {
    const [artists] = await pool.query("SELECT * FROM talentos");

    return artists;
  }

  static async getById(id) {
    const [artistFound] = await pool.query(
      "SELECT * FROM talentos WHERE id = ?",
      [id]
    );

    return artistFound[0];
  }

  static async create(input) {
    const result = await pool.query(
      "INSERT INTO talentos (nombre,tipo,genero,semblanza,instagram,facebook,tiktok,foto,video) VALUES (?,?,?,?,?,?,?,?,?)",
      [
        input.nombre,
        input.tipo,
        input.genero,
        input.semblanza,
        input.instagram,
        input.facebook,
        input.tiktok,
        input.foto,
        input.video,
      ]
    );

    return result[0];
  }

  static async update(input, id){
    const result = await pool.query(
      "UPDATE talentos SET nombre = ?, tipo = ?, genero = ?, semblanza = ?, instagram = ?, facebook = ?, tiktok = ?, foto = ?, video = ? WHERE id = ?",
      [
        input.nombre,
        input.tipo,
        input.genero,
        input.semblanza,
        input.instagram,
        input.facebook,
        input.tiktok,
        input.foto,
        input.video,
        id
      ]
    );

    return result[0];
  }

  static async delete(id){
    const result = await pool.query("DELETE FROM talentos WHERE id = ?", [id])

    return result[0]
  }
}
