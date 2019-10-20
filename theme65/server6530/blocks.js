const { selectQueryRowFactory, selectQueryFactory } = require("./utils_db");
const { composeContent } = require("./contents");

async function composeBlock_Header(coreData,appData,blockAttributes) {
    return `<h2>${blockAttributes.text}</h2>`;
}

async function composeBlock_FormattedText(coreData,appData,blockAttributes) {
    return `<div>${blockAttributes.text}</div>`;
}

async function composeBlock_Search(coreData,appData,blockAttributes) {
    return `<input type=text value='введите строку для поиска по сайту...'>`;
}

async function composeBlock_Image(coreData,appData,blockAttributes) {

    const imageId=blockAttributes.image;
    if ( !imageId )
        return "";

    let imageRow=await selectQueryRowFactory(coreData.connection, `
        select url
        from images
        where id=?
    ;`, [imageId]);

    return `<img src='${imageRow.url}' style='display: block; max-width: 400px'>`;
}

async function composeBlock_WeatherForecast(coreData,appData,blockAttributes) {
    return `
город: ${blockAttributes.location}, период: ${blockAttributes.period}<br>
<img src='/images/weather-forecast.jpg' style='display: block; max-width: 400px'>
    `;
}

async function composeBlock_Banner(coreData,appData,blockAttributes) {

    const bannerId=blockAttributes.banner;
    if ( !bannerId )
        return "";

    let bannerRow=await selectQueryRowFactory(coreData.connection, `
        select html
        from banners
        where id=?
    ;`, [bannerId]);

    return bannerRow.html;
}

async function composeBlock_Contacts(coreData,appData,blockAttributes) {
    return `
Наши контакты: тел. 233-322-233-322<br>
Лучшие страницы: <a href="/main">главная страница</a> <a href="/news">новости</a>
`;
}

async function composeBlock_News(coreData,appData,blockAttributes) {

    let news=await selectQueryFactory(coreData.connection, `
        select url_code, header
        from news
    ;`, []);

    return `
<h3>НОВОСТИ:</h3>
${news.map( newRow => `<a href="/new/${newRow.url_code}">${newRow.header}</a>` ).join("<br>")}
    `;
}

async function composeBlock_URLNew_Header(coreData,appData,blockAttributes) {
    return `<h1>${appData.newInfo.header}</h1>`;
}

async function composeBlock_URLNew_Text(coreData,appData,blockAttributes) {
    const HTMLs=await composeContent(appData.newInfo.content,coreData,appData);
    return HTMLs.join("\n");
}

async function composeBlock_URLIndPage_Text(coreData,appData,blockAttributes) {
    const HTMLs=await composeContent(appData.indPageInfo.content,coreData,appData);
    return HTMLs.join("\n");
}

async function composeBlock_Container_LtR(coreData,appData,blockAttributes) {
    const HTMLs=await composeContent(blockAttributes.content,coreData,appData);
    return `
<table border=1 cellpadding=5 style='border-collapse: collapse'><tr>
${HTMLs.map( html => `<td valign=top>${html}</td>` ).join("\n")}
</tr></table>    
    `;
}

async function composeBlock_Container_2Col(coreData,appData,blockAttributes) {
    const HTML1s=await composeContent(blockAttributes.content1,coreData,appData);
    const HTML2s=await composeContent(blockAttributes.content2,coreData,appData);
    return `
<table border=1 cellpadding=5 style='border-collapse: collapse'><tr>
<td>\n${HTML1s.join("\n")}</td>\n
<td>\n${HTML2s.join("\n")}</td>\n
</tr></table>    
    `;
}

module.exports={
    composeBlock_Header,composeBlock_FormattedText,
    composeBlock_Search,
    composeBlock_Image,
    composeBlock_WeatherForecast,
    composeBlock_Banner,
    composeBlock_Contacts,
    composeBlock_News,
    composeBlock_URLNew_Header,composeBlock_URLNew_Text,
    composeBlock_URLIndPage_Text,
    composeBlock_Container_LtR,composeBlock_Container_2Col,
};
