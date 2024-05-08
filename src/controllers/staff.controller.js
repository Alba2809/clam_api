import { ArtistModel } from "../models/artist.model.js";
import { StaffModel } from "../models/staff.model.js";

export const register = async (req, res) => {
  try {
    const { id_talento, nombre_talento, staff } = req.body;
    let id = id_talento;
    
    if (!id) {
      const artist = await ArtistModel.getByName(nombre_talento);
      if (!artist) {
        return res.status(400).json(["No se encontró el talento."]);
      }
      id = artist.id;
    }

    await StaffModel.deleteAll(id);

    const staff_created = staff.map(async (staffData) => {
      const staffCreated = await StaffModel.createById(id, staffData);
      return staffCreated;
    });

    const staffCreated = await Promise.all(staff_created);

    if (staff.lenght!== staffCreated.lenght) {
      return res
       .status(400)
       .json(["Hubo un error al registrar el staff."]);
    }

    await ArtistModel.updateDateById(id);

    return res.json(staffCreated);
  } catch (error) {
    console.log(error)
    res.status(500).json(["Hubo un error al registrar el staff."]);
  }
};

export const getStaff = async (req, res) => {
  try {
    const staff = await StaffModel.getAll(req.params.id);
    res.json(staff);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener el staff."]);
  }
};