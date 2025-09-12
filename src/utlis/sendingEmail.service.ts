import nodemailer from "nodemailer";
import EventEmitter from "node:events";

export class EmailEvent extends EventEmitter {
}

const EmailEventService = new EmailEvent();
export default EmailEventService;
EmailEventService.on('confirmationEmail', async (to: string, subject: string) => {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS_EMAIL,
            }

        });
        await transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject,
            html: "<!DOCTYPE html>\n" +
                "<html lang=\"ar\" dir=\"rtl\">\n" +
                "<head>\n" +
                "  <meta charset=\"UTF-8\">\n" +
                "  <title>أهلاً بك!</title>\n" +
                "  <style>\n" +
                "    body {\n" +
                "      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;\n" +
                "      background-color: #f4f4f4;\n" +
                "      margin: 0;\n" +
                "      padding: 0;\n" +
                "    }\n" +
                "    .email-container {\n" +
                "      max-width: 600px;\n" +
                "      margin: auto;\n" +
                "      background-color: #ffffff;\n" +
                "      padding: 30px;\n" +
                "      border-radius: 10px;\n" +
                "      box-shadow: 0 2px 10px rgba(0,0,0,0.1);\n" +
                "      color: #333333;\n" +
                "    }\n" +
                "    .header {\n" +
                "      text-align: center;\n" +
                "      padding-bottom: 20px;\n" +
                "    }\n" +
                "    .header h2 {\n" +
                "      color: #2196F3;\n" +
                "      margin: 0;\n" +
                "    }\n" +
                "    .content {\n" +
                "      font-size: 17px;\n" +
                "      line-height: 1.8;\n" +
                "      text-align: center;\n" +
                "    }\n" +
                "    .footer {\n" +
                "      text-align: center;\n" +
                "      font-size: 13px;\n" +
                "      color: #999999;\n" +
                "      margin-top: 40px;\n" +
                "    }\n" +
                "  </style>\n" +
                "</head>\n" +
                "<body>\n" +
                "  <div class=\"email-container\">\n" +
                "    <div class=\"header\">\n" +
                "      <h2>🎉 أهلاً وسهلاً بك!</h2>\n" +
                "    </div>\n" +
                "    <div class=\"content\">\n" +
                "      <p>نحن سعداء بانضمامك إلينا ❤️</p>\n" +
                "      <p>تم إنشاء حسابك بنجاح، ونتمنى لك تجربة رائعة معنا.</p>\n" +
                "      <p>إذا كان لديك أي استفسار، لا تتردد في التواصل معنا في أي وقت.</p>\n" +
                "    </div>\n" +
                "    <div class=\"footer\">\n" +
                "      هذه الرسالة أُرسلت تلقائيًا، الرجاء عدم الرد عليها.\n" +
                "    </div>\n" +
                "  </div>\n" +
                "</body>\n" +
                "</html>\n"
        })

    }
);
