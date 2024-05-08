import { ArtistModel } from "../models/artist.model.js";
import { ContactModel } from "../models/contact.model.js";

export const register = async (req, res) => {
  try {
    const { id_talento, nombre_talento, contactos } = req.body;
    let id = id_talento;
    /* Si el id del talento no se proporciona, se utiliza el nombre para buscarlo y realizar el registro */
    if (!id) {
      const artist = await ArtistModel.getByName(nombre_talento);
      if (!artist) {
        return res.status(400).json(["No se encontró el talento."]);
      }
      id = artist.id;
    }

    /* delete all contacts exiting */
    await ContactModel.deleteAll(id);

    const contact_created = contactos.map(async (contacto) => {
      const contactoCreated = await ContactModel.createById(id, contacto);
      return contactoCreated;
    });

    const contactosCreated = await Promise.all(contact_created);

    if (contactos.lenght!== contactosCreated.lenght) {
      return res
       .status(400)
       .json(["Hubo un error al registrar los contactos."]);
    }

    await ArtistModel.updateDateById(id);

    return res.json(contactosCreated);
  } catch (error) {
    console.log(error)
    res.status(500).json(["Hubo un error al registrar los contactos."]);
  }
};

export const getContacts = async (req, res) => {
  try {
    const contactos = await ContactModel.getAll(req.params.id);
    res.json(contactos);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener los contactos."]);
  }
};