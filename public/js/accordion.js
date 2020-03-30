String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};
(function () {
    function accordionConstructor(element) {
        accordionConstructor['init' + element.dataset.toggle.capitalize()].call(this, element);
    }
    accordionConstructor.init = function f() {
        let collection = document.querySelectorAll('[data-toggle="accordion"]');
        if(collection[0]){
            for(let item of collection){
                this(item);
            }
            let accordionActive = document.querySelectorAll('.active[data-toggle="accordion"]');
            if(accordionActive[0]){
                for(let item of accordionActive){
                    accordionConstructor.showActiveCustom(item);
                }
            }
        }
    }
    accordionConstructor.initAccordion = function f(element){
        element.addEventListener('click', handlerToggleAccordion);
    }
    let handlerToggleAccordion = (event, target) => {
        let trg = (event != undefined) ? event.target.closest('[data-toggle="accordion"]') : target,
            controls = document.getElementById(`${trg.dataset.controls}`),
            accordion = document.getElementById(`${trg.dataset.parenet}`),
            active = (event != undefined) ?  accordion.querySelector('[data-toggle="accordion"].active') || false : false,
            activeControls = (active != false) ? document.getElementById(`${active.dataset.controls}`) : false;
        try{
            if(active != false || trg == active){
                activeControls.style.height = `0px`;
                active.classList.remove('active');
            }
            if(trg != active){
                trg.classList.add('active');
                controls.style.height = `${height(controls)}px`;
            }
        }catch (e) {
            console.log(e.message);
        }
    }

    let height = (block) =>{
        let height = 0;
        for(let item of block.children){
            height += item.clientHeight;
        }
        return height;
    }
    accordionConstructor.showActiveCustom = (item) => {
        handlerToggleAccordion(undefined, item)
    }
    window.accordion = accordionConstructor;
    document.addEventListener('DOMContentLoaded', function(){
        accordion.init();
    })

})();