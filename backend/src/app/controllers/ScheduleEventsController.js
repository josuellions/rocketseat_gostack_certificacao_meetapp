import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Eventsmeetups from '../models/Eventsmeetups';
import User from '../models/User';
import File from '../models/File';

class ScheduleEventsController {
  async index(req, res) {
    const { page = 1, date } = req.query;
    const parseDate = parseISO(date);

    if (!date) {
      return res.status(400).json({ error: 'Invalid date!' });
    }

    const events = await Eventsmeetups.findAll({
      where: {
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(parseDate), endOfDay(parseDate)],
        },
      },
      order: [['date', 'asc']],
      limit: 10,
      offset: (page - 1) * 10,
      attributes: [
        'id',
        'title',
        'description',
        'locate',
        'date',
        'past',
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
}

export default new ScheduleEventsController();
