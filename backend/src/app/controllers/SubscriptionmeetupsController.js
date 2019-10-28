import {
  startOfHour,
  parseISO,
  isBefore,
  isPast,
  format,
  subHours,
} from 'date-fns';
import pt from 'date-fns/locale/pt';
import Subscriptionmeetups from '../models/Subscriptionmeetups';
import Eventsmeetups from '../models/Eventsmeetups';
import Notification from '../schemas/Notification';
import User from '../models/User';
import File from '../models/File';

import InscritionMail from '../jobs/InscritionMail';
import Queue from '../../lib/Queue';

class SubscriptionmeetupsController {
  async index(req, res) {
    // const { page = 1 } = req.query;

    const checkIsSubscription = await Subscriptionmeetups.findAll({
      where: {
        user_id: req.userId,
        canceled_at: null,
      },
      order: [['createdAt', 'desc']],
      // limit: 10,
      // offset: (page - 1) * 10,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
        },
        {
          model: Eventsmeetups,
          as: 'eventsmeetups',
          attributes: [
            'id',
            'title',
            'description',
            'locate',
            'date',
            'past',
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
        },
      ],
    });

    if (!checkIsSubscription) {
      return res.status(401).json({ error: 'You not possuit meetups events!' });
    }
    return res.json(checkIsSubscription);
  }

  async store(req, res) {
    const { _eventId } = req.params;
    const { userId } = req;

    const event = await Eventsmeetups.findOne({
      where: { id: _eventId },
    });

    if (!event) {
      return res.status(400).json({ error: 'Validation fails!' });
    }

    const { user_id } = event;

    if (userId === user_id) {
      return res.status(400).json({
        error: 'Registration in the event that is organizing is not allowed!',
      });
    }

    const dt = new Date();
    const parseDate = parseISO(event.date);

    if (isPast(parseDate, dt)) {
      return res.status(400).json({
        error: 'Past event registration is not allowed!',
      });
    }

    const checksubscriptions = await Subscriptionmeetups.findOne({
      where: { event_id: _eventId, user_id: userId, canceled_at: null },
    });

    if (checksubscriptions) {
      return res.status(400).json({
        error: 'Registration for the same event is not allowed!',
      });
    }

    const meetup = await Eventsmeetups.findByPk(_eventId, {
      include: [{ model: User, as: 'user' }],
    });

    const hourStart = startOfHour(parseISO(meetup.date));

    const checksubscriptionsdate = await Subscriptionmeetups.findOne({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: Eventsmeetups,
          as: 'eventsmeetups',
          required: true,
          where: {
            date: hourStart,
          },
        },
      ],
    });

    if (checksubscriptionsdate) {
      return res.status(400).json({
        error:
          'You cannot sign up for two meetups that happen at the same time!',
      });
    }

    const subscriptions = await Subscriptionmeetups.create({
      user_id: userId,
      event_id: _eventId,
    });

    const { id } = subscriptions;

    const response = await Subscriptionmeetups.findAll({
      where: { id },
      attributes: ['id'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
        },
        {
          model: Eventsmeetups,
          as: 'eventsmeetups',
          attributes: ['title', 'description', 'locate', 'date'],
        },
      ],
    });

    /* Notifying Event Organizer
     * user_id = user created meetup receives notification */

    const formattedDate = format(
      hourStart,
      "' no dia' dd 'de' MMMM', às' H:mm'h'",
      { locale: pt }
    );

    const responseUser = await User.findOne({
      where: { id: userId },
    });

    const { title, locate, description } = meetup;
    const { name, email } = responseUser;

    await Notification.create({
      content: `Nova incrição no envento de Meetups - ${title}
        ${formattedDate} no endereço: ${locate}, informações do
        do inscrito nome: ${name}, email: ${email}`,

      user: meetup.user_id,
    });

    const eventOrganizationUser = await User.findByPk(meetup.user_id);

    await Queue.add(InscritionMail.key, {
      eventOrganizationUser,
      name,
      email,
      title,
      description,
      locate,
      formattedDate,
    });

    return res.json(response);
  }

  async delete(req, res) {
    const { _eventId } = req.params;
    const subscriptionmeetups = await Subscriptionmeetups.findByPk(_eventId);

    if (subscriptionmeetups.user_id !== req.userId) {
      return res.status(401).json({
        error: "You don't have permission to cancel event this  meetup!",
      });
    }

    const dateWithSub = subHours(subscriptionmeetups.date, 2);

    if (isBefore(dateWithSub, new Date())) {
      return res.status(401).json({
        error: 'You can only cancel event this meetup 2 hours in advance!',
      });
    }

    subscriptionmeetups.canceled_at = new Date();

    await subscriptionmeetups.save();

    return res.json(subscriptionmeetups);
  }
}

export default new SubscriptionmeetupsController();
