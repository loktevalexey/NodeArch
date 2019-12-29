const nodemailer = require("nodemailer");

const { removeTags } = require('../../utils/utils');
const { mailer_transportConfig, mailer_fromEmail } = require("./mail_credentials.js");

// отсылает почту на указанный емейл, с указанной темой и телом письма
// тело может быть с HTML-тегами
function sendEmail(recipientEmail,subject,body) {

    return new Promise( (resolve,reject) => {

        let transporter = nodemailer.createTransport(mailer_transportConfig);
        /* 
            в mailer_transportConfig примерно следующее:
            {
                host: "smtp.yandex.ru", // почтовый сервер
                port: 465, // порт
                secure: true,
                auth: {
                    user: "user@site.com", // логин-пароль к почтовому ящику, откуда идёт отправка
                    pass: "xxxxxxx"
                }
            };
        */

        let text=body;
        let html=undefined;
        let textWOTags=removeTags(text);
        if ( textWOTags!==text ) { // если теги есть - отправляем две разных версии письма, HTML и текстовую; если тегов нет - только текстовую
            text=textWOTags;
            html=body;
        }

        let message = {
            from: mailer_fromEmail, // с какого ящика идёт отправка (емейл отправителя), может не совпадать с mailer_transportConfig.auth
            to: recipientEmail,
            subject: subject,
            text: text, // текстовая версия письма
            html: html, // HTML-версия письма
        };

        transporter.sendMail(message, (err,info) => {
            if ( err ) {
                console.error("sendEmail - error",err);
                reject(err);
            }
            else {
                resolve(info);
                /*
info.messageId most transports should return the final Message-Id value used with this property
info.envelope includes the envelope object for the message
info.accepted is an array returned by SMTP transports (includes recipient addresses that were accepted by the server)
info.rejected is an array returned by SMTP transports (includes recipient addresses that were rejected by the server)
info.pending is an array returned by Direct SMTP transport. Includes recipient addresses that were temporarily rejected together with the server response
info.response is a string returned by SMTP transports and includes the last SMTP response from the server                
                */
            }
        } );

    } );

}

sendEmail('loktev.alex.74@gmail.com','тестовое письмо','Привет!<br><b>Пока!</b>')
    .then( () => { console.log("Письмо отправлено!"); } )
    .catch( err => { console.error(err); } )
;
