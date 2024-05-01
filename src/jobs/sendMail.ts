import Mail from "../lib/Mail";

export default {
  key: "sendMail",
  async handle({ data }: any) {
    const { user } = data;
    await Mail.sendMail({
      from: "Queue <qg6GQ@example.com>",
      to: user.email,
      subject: "Bem vindo ao sistema",
      html: `Ola ${user.name}, bem vindo ao sistema`,
    });
  },
};
