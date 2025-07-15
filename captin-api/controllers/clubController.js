import {
  createClubService,
  getMyClubsService,
  createCaptinUnderClubService,
  getCaptinsByClubService,
  getClubWithCaptinsService
} from '../services/clubService.js';

export const createClub = async (req, res) => {
  const { name, location } = req.body;

  try {
    const club = await createClubService({ name, location }, req.user._id);
    res.status(201).json(club);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getMyClubs = async (req, res) => {
  try {
    const clubs = await getMyClubsService(req.user._id);
    res.json(clubs);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const createCaptin = async (req, res) => {
  const { name, specialty, club } = req.body;

  try {
    const captin = await createCaptinUnderClubService({ name, specialty, club }, req.user._id);
    res.status(201).json(captin);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getCaptinsByClub = async (req, res) => {
  const { clubId } = req.params;

  try {
    const captins = await getCaptinsByClubService(clubId);
    res.json(captins);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getClubWithCaptins = async (req, res) => {
  try {
    const { club, captins } = await getClubWithCaptinsService(req.params.id);
    res.json({ club, captins });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};