const FAM_MAX_LEN=30;
const IM_MAX_LEN=20;
const OTCH_MAX_LEN=30;

function right(str,len) {
    return str.substring(str.length-len);
}

function getAnketaValidationErrors(anketa) {
    // вернёт массив хэшей структуры { fldname:string, errortext:string, focusfldname:string }
    // fldname - имя поля в котором ошибка или null, errortext - текст ошибки, focusfldname - какое поле сфокусировать или null
    let errors=[];

    if ( !anketa.fam )
        errors.push({fldname:'fam',errortext:'фамилия не заполнена',focusfldname:'fam'});
    else if ( anketa.fam.length>FAM_MAX_LEN )
        errors.push({fldname:'fam',errortext:'фамилия слишком длинная, введите не более '+FAM_MAX_LEN+' символов',focusfldname:'fam'});

    if ( !anketa.im )
        errors.push({fldname:'im',errortext:'имя не заполнено',focusfldname:'im'});
    else if ( anketa.im.length>IM_MAX_LEN )
        errors.push({fldname:'im',errortext:'имя слишком длинное, введите не более '+IM_MAX_LEN+' символов',focusfldname:'im'});

    if ( !anketa.otch )
        errors.push({fldname:'otch',errortext:'отчество не заполнено',focusfldname:'otch'});
    else if ( anketa.otch.length>OTCH_MAX_LEN )
        errors.push({fldname:'otch',errortext:'отчество слишком длинное, введите не более '+OTCH_MAX_LEN+' символов',focusfldname:'otch'});

    if ( !anketa.gender )
        errors.push({fldname:'gender',errortext:'пол не выбран',focusfldname:'gender'});
    else {
        if ( anketa.otch && ((anketa.gender==="M" && right(anketa.otch,3)!=="вич") || (anketa.gender==="F" && right(anketa.otch,3)!=="вна")) )
            errors.push({fldname:null,errortext:'отчество не соответствует полу',focusfldname:null});
    }    

    return errors;
}

export {
    getAnketaValidationErrors,
};
