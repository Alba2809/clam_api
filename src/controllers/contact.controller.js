import { ArtistModel } from "../models/artist.model.js";
import { ContactModel } from "../models/contact.model.js";

export const register = async (req, res) => {
  try {
    const { id_talento, nombre_talento, contactos } = req.body;

    /* Si el id del talento no se proporciona, se utiliza el nombre para buscarlo y realizar el registro */
    if (!id_talento) {
      const contact_created = contactos.map(async (contacto) => {
        const contactoCreated = await ContactModel.createByName(
          nombre_talento,
          contacto
        );
        return contactoCreated;
      });
      const contactosCreated = await Promise.all(contact_created);

      if (contactos.lenght !== contactosCreated.lenght) {
        return res
          .status(400)
          .json(["Hubo un error al registrar los contactos."]);
      }

      /* Si todo va bien, se actualiza el updateAt del talento */
      await ArtistModel.updateDateByName(nombre_talento);

      return res.json(contactosCreated);
    }

    const contact_created = contactos.map(async (contacto) => {
      const contactoCreated = await ContactModel.createById(id_talento, contacto);
      return contactoCreated;
    });

    const contactosCreated = await Promise.all(contact_created);

    if (contactos.lenght!== contactosCreated.lenght) {
      return res
       .status(400)
       .json(["Hubo un error al registrar los contactos."]);
    }

    await ArtistModel.updateDateById(id_talento);

    return res.json(contactosCreated);
  } catch (error) {
    res.status(500).json(["Hubo un error al registrar los contactos."]);
  }
};
