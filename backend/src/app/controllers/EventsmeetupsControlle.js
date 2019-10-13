import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import Eventsmeetups from '../models/Eventsmeetups';
import User from '../models/User';
import File from '../models/File';

class EventsmeetupsController {
  /* List Envents */

  async index(req, res) {
    const { page = 1 } = req.query;

    const events = await Eventsmeetups.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      limit: 10,
      offset: (page - 1) * 10,
      attributes: [
        'title',
        'description',
        'locate',
        'date',
        'user_id',
        'file_id',
      ],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(events);
  }

  // Create Events
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      locate: Yup.string().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { date, file_id, title, description, locate } = req.body;

    const dateEnvent = startOfHour(parseISO(date));

    if (isBefore(dateEnvent, new Date())) {
      return res.status(400).json({ error: 'Past dates  are not is valid!' });
    }

    const checkAvailability = await Eventsmeetups.findOne({
      where: {
        user_id: req.userId,
        canceled_at: null,
        date: dateEnvent,
      },
    });

    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'This Meetup event date is not available!' });
    }

    const event = await Eventsmeetups.create({
      user_id: req.userId,
      file_id,
      title,
      description,
      locate,
      date: dateEnvent,
    });

    const response = await Eventsmeetups.findAll({
      where: { id: event.id },
      attributes: [
        'title',
        'description',
        'locate',
        'date',
        'user_id',
        'file_id',
      ],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(response);
  }
}

export default new EventsmeetupsController();
