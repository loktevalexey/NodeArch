const { selectQueryFactory } = require("./utils_db");

// возвращает массив со всеми УРЛами (страницами) сайта
async function getUrls(connection) {

    let urls=[];

    let indPages=await selectQueryFactory(connection, `select url_code from indpages;`, []);
    indPages.forEach( indPageRow => {
        urls.push({
            url:`/${indPageRow.url_code}`,
            groupCode:'indpage',
            groupParams:{indPageURLCode:indPageRow.url_code},
        });
    } );

    let news=await selectQueryFactory(connection, `select url_code from news;`, []);
    news.forEach( newRow => {
        urls.push({
            url:`/new/${newRow.url_code}`,
            groupCode:'new',
            groupParams:{newURLCode:newRow.url_code},
        });
    } );

    return urls;
}

module.exports={
    getUrls,
};
