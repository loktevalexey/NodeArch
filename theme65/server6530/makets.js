const { composeContent } = require("./contents");

async function composeMaket_New(coreData,appData) {
    // надо построить МАКЕТ одной новости
    // по взятому нами определению термина "МАКЕТ", 
    // мы точно знаем, из каких визуальных частей свёрстан этот макет и точно знаем, "КОНТЕНТ" с каким идентификатором в каждой визуальной части надо отобразить
    // функция должна вернуть HTML-код, пригодный для отправки клиенту

    let html="";

    html+=`<html lang="ru">\n`;
    html+=`<head>\n`;
    if ( appData.newInfo.metakeywords )
        html+=`<meta name="keywords" content="${appData.newInfo.metakeywords}"/>\n`;
    if ( appData.newInfo.metadescription )
        html+=`<meta name="description" content="${appData.newInfo.metadescription}"/>\n`;
    html+=`<title>Новость - ${appData.newInfo.header} - ${appData.options.SITENAME.str_value}</title>\n`;
    html+=`</head>\n`;

    // скомпонуем HTML-код для каждой визуальной части сайта, построив соответствующий контент
    let headContentHTMLs=await composeContent(22,coreData,appData); // мы точно знаем, что в макете одной новости в шапке - всегда контент 22
    let bannersContentHTMLs=await composeContent(11,coreData,appData); // в макете одной новости в баннерах - всегда контент 11
    let bottomContentHTMLs=await composeContent(33,coreData,appData); // в макете одной новости в подвале - всегда контент 33
    let urlNewContentHTMLs=await composeContent(44,coreData,appData); // в макете одной новости в "новости из УРЛа" - всегда контент 44

    html+=`<table border=1 cellpadding=5 style='width: 100%; border-collapse: collapse'>\n`;
    html+=`<tr><td colspan=2><i>ШАПКА</i><br>${headContentHTMLs.join("\n")}</td></tr>\n`;
    html+=`<tr>\n`;
    html+=`<td valign=top style='width: 300px'><i>РЕКЛАМА</i><br>${bannersContentHTMLs.join("\n")}</td>\n`;
    html+=`<td valign=top><i>НОВОСТЬ ИЗ УРЛА</i><br>${urlNewContentHTMLs.join("\n")}</td>\n`;
    html+=`</tr>\n`;
    html+=`<tr><td colspan=2><i>ПОДВАЛ</i><br>${bottomContentHTMLs.join("\n")}</td></tr>\n`;
    html+=`</table>\n`;

    html+=`</html>\n`;

    return html;
}

async function composeMaket_IndPage(coreData,appData) {

    let html="";

    html+=`<html lang="ru">\n`;
    html+=`<head>\n`;
    if ( appData.indPageInfo.metakeywords )
        html+=`<meta name="keywords" content="${appData.indPageInfo.metakeywords}"/>\n`;
    if ( appData.indPageInfo.metadescription )
        html+=`<meta name="description" content="${appData.indPageInfo.metadescription}"/>\n`;
    html+=`<title>${appData.indPageInfo.title} - ${appData.options.SITENAME.str_value}</title>\n`;
    html+=`</head>\n`;

    // скомпонуем HTML-код для каждой визуальной части сайта, построив соответствующий контент
    let headContentHTMLs=await composeContent(22,coreData,appData); // в макете индивидуальной страницы в шапке - пусть будет всё тот же контент 22
    let bottomContentHTMLs=await composeContent(33,coreData,appData); // в макете индивидуальной страницы в подвале - пусть будет всё тот же контент 33
    let urlIndPageContentHTMLs=await composeContent(55,coreData,appData); // в макете индивидуальной страницы в "содержимом страницы из УРЛа" - всегда контент 55

    html+=`<table border=1 cellpadding=5 style='width: 100%; border-collapse: collapse'>\n`;
    html+=`<tr><td><i>ШАПКА</i><br>${headContentHTMLs.join("\n")}</td></tr>\n`;
    html+=`<tr>\n`;
    html+=`<td><i>СОДЕРЖИМОЕ СТРАНИЦЫ ИЗ УРЛА</i><br>${urlIndPageContentHTMLs.join("\n")}</td>\n`;
    html+=`</tr>\n`;
    html+=`<tr><td><i>ПОДВАЛ</i><br>${bottomContentHTMLs.join("\n")}</td></tr>\n`;
    html+=`</table>\n`;

    html+=`</html>\n`;

    return html;
}

module.exports={
    composeMaket_New,
    composeMaket_IndPage,
};
