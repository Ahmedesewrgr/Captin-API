import Captin from '../models/Captin.js';

export const createCaptinService = async ({ name, specialty, club }, userId) => {
  const captin = await Captin.create({
    name,
    specialty,
    club,
    createdBy: userId,
    user: userId
  });

  return captin;
};

export const getCaptinsByClubService = async (clubId) => {
  const captins = await Captin.find({ club: clubId })
    .populate('club', 'name location');

  return captins;
};