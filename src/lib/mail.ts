import nodemailer from "nodemailer";

export async function getEmailClient() {
  const account = await nodemailer.createTestAccount();

  const protocol = "smtp";
  const host = "smtp.ethereal.email";

  const transporter = nodemailer.createTransport(
    `${protocol}://${account.user}:${account.pass}@${host}/?pool=true`
  );

  return transporter;
}
