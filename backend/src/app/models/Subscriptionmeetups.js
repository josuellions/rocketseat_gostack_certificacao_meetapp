import Sequelize, { Model } from 'sequelize';
import { isBefore, parseISO, subHours } from 'date-fns';

class Subscriptionmeetups extends Model {
  static init(sequelize) {
    super.init(
      {
        canceled_at: Sequelize.DATE,
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(parseISO(this.date), new Date());
          },
        },
        cancelable: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(new Date(), subHours(parseISO(this.date), 2));
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    this.belongsTo(models.Eventsmeetups, {
      foreignKey: 'event_id',
      as: 'eventsmeetups',
    });
  }
}

export default Subscriptionmeetups;
