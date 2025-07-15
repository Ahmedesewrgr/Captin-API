import Joi from 'joi';

export const createClubSchema = Joi.object({
  name: Joi.string().min(3).required(),
  location: Joi.string().min(3).required()
});