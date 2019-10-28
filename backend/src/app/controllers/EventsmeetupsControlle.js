import * as Yup from 'yup';
import {
  startOfHour,
  startOfDay,
  endOfDay,
  parseISO,
  isBefore,
  subHours,
  format,
} from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Op } from 'sequelize';
import Eventsmeetups from '../models/Eventsmeetups';
import User from '../models/User';
import File from '../models/File';

class EventsmeetupsController {
  /* List Envents */

  async index(req, res) {
    const { page = 1, date = new Date() } = req.query;
    const parseDate = format(parseISO(date), 'yyyy-MM-dd', { locale: pt });

    const dateDay = format(new Date(), 'yyyy-MM-dd', { locale: pt });

    const events = await Eventsmeetups.findAll({
      where: {
        date: {
          [Op.between]: [
            startOfDay(parseISO(parseDate)),
            endOfDay(parseISO(parseDate)),
          ],
          [Op.gte]: parseISO(dateDay),
        },
        canceled_at: null,
        user_id: {
          [Op.ne]: req.userId,
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
        'canceled_at',
        'cancelable',
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

  /* Create Events */
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
        'id',
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

  /* Update Events */
  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      description: Yup.string(),
      locate: Yup.string(),
      date: Yup.date(),
    });
    console.log('atualiza');
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { date } = req.body;

    const dateEnvent = startOfHour(parseISO(date));

    if (isBefore(dateEnvent, new Date())) {
      return res.status(400).json({
        error: 'Past dates  are not is valid!',
      });
    }

    const checkAvailabilityDate = await Eventsmeetups.findOne({
      where: {
        canceled_at: null,
        date: dateEnvent,
      },
    });

    if (checkAvailabilityDate) {
      return res
        .status(400)
        .json({ error: 'This Meetup event date is not available!' });
    }

    const { _id } = req.params;

    const checkAvailability = await Eventsmeetups.findOne({
      where: {
        id: _id,
        user_id: req.userId,
        canceled_at: null,
      },
    });

    if (!checkAvailability) {
      return res
        .status(400)
        .json({ error: 'This Meetup event was not found! ' });
    }

    const event = await Eventsmeetups.findByPk(_id);

    const response = await event.update(req.body, {
      where: { id: _id },
      attributes: [
        'title',
        'description',
        'locate',
        'date',
        'canceled_at',
        'cancelable',
        'user_id',
        'file_id',
      ],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    return res.json(response);
  }

  /* Delete Events */
  async delete(req, res) {
    const { _id } = req.params;

    const checkEventsmeetups = await Eventsmeetups.findByPk(_id);

    if (checkEventsmeetups.user_id !== req.userId) {
      return res.status(401).json({
        error: "You don't have permission to cancel event this  meetup!",
      });
    }

    const dateWithSub = subHours(parseISO(checkEventsmeetups.date), 2);

    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({
        error: 'You can only cancel event this meetup 2 hours in advance!',
      });
    }

    checkEventsmeetups.canceled_at = new Date();

    await checkEventsmeetups.save();

    return res.json(checkEventsmeetups);
  }
}

export default new EventsmeetupsController();
