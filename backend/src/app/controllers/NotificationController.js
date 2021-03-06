import { Op } from 'sequelize';
import Notification from '../schemas/Notification';
import Eventsmeetups from '../models/Eventsmeetups';

class NotificationController {
  async index(req, res) {
    try {
      const checkIsOrganizator = await Eventsmeetups.findOne({
        where: {
          user_id: req.userId,
          date: {
            [Op.gte]: new Date(),
          },
          canceled_at: null,
        },
      });

      if (!checkIsOrganizator) {
        return res
          .status(401)
          .json({ erro: 'Only organizator con load notifications' });
      }
      const { user_id } = checkIsOrganizator;

      const notifications = await Notification.find({
        user: user_id,
      })
        .sort({ createdAt: 'desc' })
        .limit(10);

      return res.json(notifications);
    } catch (err) {
      return res.status(400).json({ error: 'Faild load notifications' });
    }
  }

  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    return res.json(notification);
  }
}

export default new NotificationController();
