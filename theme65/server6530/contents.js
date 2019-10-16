const { logLine } = require('./utils');
const { selectQueryFactory } = require("./utils_db");
const { composeBlock_Search } = require("./blocks");

async function composeContent(contentId,coreData,appData) {

    // получим список блоков, составляющих этот контент
    let contentBlocks=await selectQueryFactory(coreData.connection, `
        select cb.id, cb.block_type, bt.code block_type_code, cb.block_attributes
        from contents_blocks cb, block_types bt
        where cb.content=?
        order by cb.content_ord
    ;`, [contentId]);

    let contentHTML='';
    for ( let cb=0; cb<contentBlocks.length; cb++ ) {
        const contentBlock=contentBlocks[cb];

        // у каждого блока могут быть индивидуальные опции в поле block_attributes, распарсим в хэш
        let blockAttributes={};
        if ( contentBlock.block_attributes && contentBlock.block_attributes.trim() ) {
            try {
                blockAttributes=JSON.parse(contentBlock.block_attributes);
            }
            catch ( err ) {
                // исключения не должны ломать макет! максимум - надо просто пропустить кривой блок, мы же попробуем продолжить без атрибутов
                logLine(logFN,`cannot parse block id=${contentBlock.id} attributes`);
            }
        }

        let blockHTML='';

        switch ( contentBlock.block_type_code ) {
            case 'SEARCH':
                blockHTML=await composeBlock_Search(coreData,appData);
                break;
        }

        contentHTML+=blockHTML;
    }

    return contentHTML;
}

module.exports={
    composeContent,
};
