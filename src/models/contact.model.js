import { pool } from "../db.js";

export class ContactModel {
  static async getAll(id) {
    const [contacts] = await pool.query(
      "SELECT * FROM contactos WHERE id_talento =?",
      [id]
    );

    return contacts;
  }

  static async createById(id_talento, data) {
    const result = await pool.query(
      "INSERT INTO contactos (id_talento, representante, nombre_apellidos, puesto, pagina_web, instagram, facebook, correo, fecha_nacimiento, telefono_celular, telefono_oficiona, telefono_otro) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        id_talento,
        data.representante,
        data.nombre_apellidos,
        data.puesto,
        data.pagina_web,
        data.instagram,
        data.facebook,
        data.correo,
        data.fecha_nacimiento,
        data.telefono_celular,
        data.telefono_oficiona,
        data.telefono_otro,
      ]
    );

    return result[0];
  }

  static async createByName(nombre_talento, data) {
    const [artist_id] = await pool.query(
      "SELECT id FROM talentos WHERE LOWER(nombre) COLLATE utf8mb4_general_ci = LOWER(?)",
      [nombre_talento]
    );

    if (!artist_id[0] || !artist_id[0]?.id)
      return null

    const result = await pool.query(
      "INSERT INTO contactos (id_talento, representante, nombre_apellidos, puesto, pagina_web, instagram, facebook, correo, fecha_nacimiento, telefono_celular, telefono_oficiona, telefono_otro) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        artist_id[0]?.id,
        data.representante,
        data.nombre_apellidos,
        data.puesto,
        data.pagina_web,
        data.instagram,
        data.facebook,
        data.correo,
        data.fecha_nacimiento,
        data.telefono_celular,
        data.telefono_oficiona,
        data.telefono_otro,
      ]
    );

    return result[0].insertId;
  }

  static async deleteAll(id_talento){
    const result = await pool.query(
      "DELETE FROM contactos WHERE id_talento =?",
      [id_talento]
    );

    return result[0];
  }
}
