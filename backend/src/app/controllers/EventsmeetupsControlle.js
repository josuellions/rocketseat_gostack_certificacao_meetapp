import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore } from 'date-fns';
import Eventsmeetups from '../models/Eventsmeetups';

class EventsmeetupsController {
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

    return res.json(event);
  }
}

export default new EventsmeetupsController();
