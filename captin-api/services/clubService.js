import Club from '../models/Club.js';
import Captin from '../models/Captin.js';

export const createClubService = async ({ name, location }, ownerId) => {
  const club = await Club.create({
    name,
    location,
    owner: ownerId
  });

  return club;
};

export const getMyClubsService = async (ownerId) => {
  const clubs = await Club.find({ owner: ownerId });
  return clubs;
};

export const createCaptinUnderClubService = async ({ name, specialty, club }, userId) => {
  const captin = await Captin.create({
    name,
    specialty,
    club,
    createdBy: userId
  });

  return captin;
};

export const getCaptinsByClubService = async (clubId) => {
  const captins = await Captin.find({ club: clubId });
  return captins;
};

export const getClubWithCaptinsService = async (clubId) => {
  const club = await Club.findById(clubId);
  const captins = await Captin.find({ club: club._id });

  return { club, captins };
};