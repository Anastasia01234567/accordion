document.addEventListener('DOMContentLoaded', function () {
    let tab = document.querySelectorAll('[data-toggle="tab"]');
    if(tab[0]){
        for(let item of tab){
            item.addEventListener('callback', () =>{
                let accordionActive = document.querySelectorAll('.active[data-toggle="accordion"]');
                if(accordionActive[0]){
                    for(let item of accordionActive){
                        accordion.showActiveCustom(item);
                    }
                }
            });
        }
    }
})