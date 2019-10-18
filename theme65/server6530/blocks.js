const { selectQueryRowFactory } = require("./utils_db");
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
    return `Наши контакты: тел. 233-322-233-322`;
}

async function composeBlock_URLNew_Header(coreData,appData,blockAttributes) {
    return `<h1>${appData.newInfo.header}</h1>`;
}

async function composeBlock_URLNew_Text(coreData,appData,blockAttributes) {
    return composeContent(appData.newInfo.content,coreData,appData);
    //return appData.newInfo.content;
}

module.exports={
    composeBlock_Header,composeBlock_FormattedText,
    composeBlock_Search,
    composeBlock_Image,
    composeBlock_WeatherForecast,
    composeBlock_Banner,
    composeBlock_Contacts,
    composeBlock_URLNew_Header,composeBlock_URLNew_Text,
};
