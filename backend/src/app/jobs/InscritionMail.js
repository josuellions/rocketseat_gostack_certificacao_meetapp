import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class InscritionMail {
  get key() {
    return 'InscritionMail';
  }

  async handle({ data }) {
    const {
      eventOrganizationUser,
      name,
      email,
      title,
      description,
      locate,
      formattedDate,
    } = data;

    await Mail.sendMail({
      to: `${eventOrganizationUser.name} <${eventOrganizationUser.email}`,
      subject: 'Nova inscrição no envento de Meetup',
      template: 'inscrition',
      context: {
        organizer: eventOrganizationUser.name,
        user: name,
        email,
        date: format(new Date(), "' no dia' dd 'de' MMMM', às' H:mm'h'", {
          locale: pt,
        }),
        title,
        description,
        locate,
        dataEvent: formattedDate,
      },
    });
  }
}

export default new InscritionMail();
