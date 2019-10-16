const { composeContent } = require("./contents");

async function composeMaket_New(coreData,appData) {
    // надо построить МАКЕТ новости
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
    html+=`<title>Новость - ${appData.newInfo.header}</title>\n`;
    html+=`</head>\n`;

    // скомпонуем HTML-код для каждой визуальной части сайта, построив соответствующий контент
    headerContentHTML=await composeContent(22,coreData,appData); // мы точно знаем, что в макете новости в шапке - всегда контент 22

    html+=`<table border=1 style='width: 100%; border-collapse: collapse'>\n`;
    html+=`<tr><td colspan=2>ШАПКА<br>${headerContentHTML}</td></tr>`;
    html+=`<tr>`;
    html+=`<td>РЕКЛАМА</td>`;
    html+=`<td>НОВОСТЬ ИЗ УРЛА</td>`;
    html+=`</tr>`;
    html+=`<tr><td colspan=2>ПОДВАЛ</td></tr>`;
    html+=`</table>\n`;

    html+=`</html>\n`;

    return html;
}

module.exports={
    composeMaket_New,
};
