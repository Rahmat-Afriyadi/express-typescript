import EmailSend from "../types/email.type";
import { mailTransporter } from "../utils/mail.utils";
const handlebars = require('handlebars');

export const sendEmailService = async (email:EmailSend) => {
    try {
        let info = await mailTransporter.sendMail({
            from: email.from, // sender address
            to: "gustiankevin@gmail.com", // list of receivers
            subject: email.subject, // Subject line
            text: email.text, // plain text body
        })

        return ["berhasil mengirim email", null]
    } catch (error) {
        return [null, error]
    }
}

export const sendEmailWithHtmlService = async (email:EmailSend) => {
    try {
        let html = "await readFile('/path/to/file', 'utf8'); file type"
        let template = handlebars.compile(html);
        let data = {
            username: "Toto"
        };
        let htmlToSend = template(data);
        let info = await mailTransporter.sendMail({
            from: email.from, // sender address
            to: "gustiankevin@gmail.com", // list of receivers
            subject: email.subject, // Subject line
            text: email.text, // plain text body
        })

        return ["berhasil mengirim email", null]
    } catch (error) {
        return [null, error]
    }
}