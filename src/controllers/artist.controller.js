import { ArtistModel } from "../models/artist.model.js";

export const getArtist = async (req, res) => {
  try {
    const artistFound = await ArtistModel.getById(req.params.id);
    if (!artistFound) return res.status(400).json(["Talento no encontrado."]);
    res.json(artistFound);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener el talento."]);
  }
};

export const getArtistByName = async (req, res) => {
  try {
    const artistFound = await ArtistModel.getByName(req.params.name);
    if (!artistFound) return res.status(400).json(["Talento no encontrado."]);
    res.json(artistFound);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener el talento."]);
  }
};

export const getArtists = async (req, res) => {
  try {
    const artists = await ArtistModel.getAll();
    res.json(artists);
  } catch (error) {
    res.status(500).json(["Hubo un error al obtener los talentos."]);
  }
};

export const createArtist = async (req, res) => {
  try {
    const { nombre } = req.body

    const artistFound = await ArtistModel.getByName(nombre);

    if (artistFound) return res.status(400).json(["Talento ya existe."]);

    const artistCreated = await ArtistModel.create(req.body);

    res.json(artistCreated);
  } catch (error) {
    res.status(500).json(["Hubo un error al crear el talento."]);
  }
};

export const updateArtist = async (req, res) => {
  try {
    const artistUpdated = await ArtistModel.update(req.body, req.params.id);

    res.json(artistUpdated);
  } catch (error) {
    res.status(500).json(["Hubo un error al modificar el talento."]);
  }
};

export const deleteArtist = async (req, res) => {
  try {
    const artistDeleted = await ArtistModel.delete(req.params.id);

    res.json(artistDeleted);
  } catch (error) {
    res.status(500).json(["Hubo un error al eliminar el talento."]);
  }
};

export const inactiveArtist = async (req, res) => {
  try {
    const artistInactivated = await ArtistModel.inactive(req.params.id);

    res.json(artistInactivated);
  } catch (error) {
    res.status(500).json(["Hubo un error al cambiar a inactivo el talento."]);
  }
};
