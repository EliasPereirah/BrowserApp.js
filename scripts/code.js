setTimeout(init,4000);

function init() {
        let btn = document.querySelector('button');
        let textarea = document.querySelector('textarea');
        let select = document.querySelector("select");
        let timer = document.querySelector("input[name=timer]");
        btn.onclick = function (e) {
            timer = parseInt(timer.value);
            timer = ''+timer+'';
            timer = timer * 1000;
            select = select.value;
            insertCode(textarea.value, timer, select);
        };

}