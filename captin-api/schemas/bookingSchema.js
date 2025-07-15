import Joi from 'joi';

export const createBookingSchema = Joi.object({
  captin: Joi.string().hex().length(24).required(),
  club: Joi.string().hex().length(24).required(),
  date: Joi.date().iso().required(),
  duration: Joi.number().min(1).max(4).default(1)
});