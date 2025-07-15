import Joi from 'joi';

export const createCaptinSchema = Joi.object({
  name: Joi.string().min(3).required(),
  specialty: Joi.string().min(3).required(),
  club: Joi.string().hex().length(24).required()
});