import { startOfDay, endOfDay, parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Op } from 'sequelize';

import Eventsmeetups from '../models/Eventsmeetups';
import User from '../models/User';
import File from '../models/File';

class ScheduleEventsController {
  async index(req, res) {
    const { page = 1, date = new Date() } = req.query;
    const parseDate = format(parseISO(date), 'yyyy-MM-dd', { locale: pt });

    if (!date) {
      return res.status(400).json({ error: 'Invalid date!' });
    }

    const events = await Eventsmeetups.findAll({
      where: {
        user_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [
            startOfDay(parseISO(parseDate)),
            endOfDay(parseISO(parseDate)),
          ],
        },
      },
      order: [['date', 'desc']],
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

  async show(req, res) {
    const { _eventId } = req.params;

    if (_eventId <= 0) {
      return res.status(400).json({ error: 'Invalid event meetup!' });
    }

    const events = await Eventsmeetups.findOne({
      where: {
        id: _eventId,
        // canceled_at: null,
      },
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
