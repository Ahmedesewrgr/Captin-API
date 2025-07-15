import {
  createCaptinService,
  getCaptinsByClubService
} from '../services/captinService.js';

export const createCaptin = async (req, res) => {
  const { name, specialty, club } = req.body;

  try {
    const captin = await createCaptinService({ name, specialty, club }, req.user._id);
    res.status(201).json(captin);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getCaptinsByClub = async (req, res) => {
  const { clubId } = req.params;

  try {
    const captins = await getCaptinsByClubService(clubId);
    res.json(captins);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};