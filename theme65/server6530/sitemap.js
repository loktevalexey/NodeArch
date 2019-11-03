const mysql = require("mysql");
const fs = require("fs");
const path = require("path");

const { newConnectionFactory } = require("./utils_db");
const { selectQueryFactory } = require("./utils_db");
const { getUrls } = require("./all_urls");

(async function () {

    const poolConfig={
        connectionLimit : 1,      // server6530.js может создать 10 соединений, и этот скрипт ещё одно, полагаем что СУБД выдержит 11 соединений
        host     : 'localhost',   // на каком компьютере расположена база данных
        user     : 'nodeuser',    // каким пользователем подключаемся (на учебном сервере - "root")
        password : 'nodepass',    // каким паролем подключаемся (на учебном сервере - "1234")
        database : 'site_db',     // к какой базе данных подключаемся
    };
    let pool = mysql.createPool(poolConfig); // вообще говоря, пул тут не нужен, нам нужно ровно 1 соединение, но хочется пользовать уже разработанными промисифицированными функциями, а они работают с пулом
    
    let connection=await newConnectionFactory(pool,null);

    const urls=await getUrls(connection);

    // для формирования поля lastmod, нам нужно знать, когда последний раз менялась каждая страница
    // у нас система индексации для внутреннего поиска хранит этот момент в index_urls в поле last_modification_dt
    // по каждому УРЛу делать отдельный запрос в index_urls дорого, поэтому зачитаем всю эту таблицу сразу
    let indexUrls=await selectQueryFactory(connection, `select url, last_modification_dt from index_urls;`, []);
    // построим хэш, ключ - УРЛ, значение - момент последней модификации
    let lastModificationsHash={};
    indexUrls.forEach( indexUrl => {
        lastModificationsHash[indexUrl.url]=indexUrl.last_modification_dt;
    } );

    const sitemap=`
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${
    urls.map( url => `
        <url>
            <loc>https://ourbestsite.com${url.url}</loc>
            <changefreq>weekly</changefreq>
            <priority>0.8</priority>
            <lastmod>${ lastModificationsHash[url.url] ? lastModificationsHash[url.url].toISOString() : "" }</lastmod>
        </url>    
    `).join("")
}
</urlset>
    `;

    fs.writeFile(path.resolve(__dirname,"sitemap.xml"), sitemap, (err) => {
        if (err) 
            console.log(err);
        else
            console.log('sitemap.xml has been saved.');

        connection.release();

        pool.end(function(err) {
            if (err) {
                console.log(err.message);
                return;
            }
        });
        
    });

})();
