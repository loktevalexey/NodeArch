const { URLSearchParams } = require('url');
const fetch = require('isomorphic-fetch');

import { getAnketaValidationErrors } from '../../server4570/shared/anketavalidation';

describe('validation function tests', function() {

    it('empty family disabled', function() {
        const errors=getAnketaValidationErrors({fam:'',im:'Пётр',otch:'Сергеевич',gender:'M'});
        expect(errors.length).toBe(1);
        expect(errors[0].errortext).toBe("фамилия не заполнена");
    });
    // ну и аналогично другие проверки на пустые поля или слишком длинные поля
    
    it('male otch only vich', function() {
        const errors=getAnketaValidationErrors({fam:'Иванова',im:'Мария',otch:'Сергеевна',gender:'M'});
        expect(errors.length).toBe(1);
        expect(errors[0].errortext).toBe("отчество не соответствует полу");
    });
    it('female otch only vna', function() {
        const errors=getAnketaValidationErrors({fam:'Иванов',im:'Пётр',otch:'Сергеевич',gender:'F'});
        expect(errors.length).toBe(1);
        expect(errors[0].errortext).toBe("отчество не соответствует полу");
    });

    // чтобы не нарушать DRY фразами типа "фамилия не заполнена" и "отчество не соответствует полу" и в тестах и в функциональном модуле, 
    // следует выносить их в строки-паттерны и импортировать и там и там

    it('right anketa is ok', function() {
        const errors=getAnketaValidationErrors({fam:'Иванова',im:'Мария',otch:'Сергеевна',gender:'F'});
        expect(errors.length).toBe(0);
    });

});

describe('service call tests', function() {

    // асинхронные тесты

    it('right anketa is ok', async function(done) { // функцию done мы должны вызвать САМИ, когда всё протестируем

        const params = new URLSearchParams();
        params.append('fam', "Иванов");
        params.append('im', "Пётр");
        params.append('otch', "Сергеевич");
        params.append('gender', "M");
        console.log(params.toString());
   
        const fetchOptions={
            method: "post",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params,
        };
        const response=await fetch('http://nodearch.e-learning.by:4570/send',fetchOptions);
        expect(response.status).toBe(200);
        done(); // мы закончили проверки, но Jasmine об этом не знает; вызывая done, мы говорим ему что можно выводить отчёт
    
    });

    it('empty family disabled', async function(done) {

        const params = new URLSearchParams();
        params.append('fam', "");
        params.append('im', "Пётр");
        params.append('otch', "Сергеевич");
        params.append('gender', "M");
        console.log(params.toString());
   
        const fetchOptions={
            method: "post",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params,
        };
        const response=await fetch('http://nodearch.e-learning.by:4570/send',fetchOptions);
        expect(response.status).toBe(400);
        done();
    
    });

});
