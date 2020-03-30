(function(){
    class Tab {
        constructor(){
            this.tab = '.tab';
            this.tabItem = '.tab__item';
            this.tabContent = '.tab-content';
        }
        init(){
            let tab = document.querySelectorAll('[data-toggle="tab"]');
            if(tab[0]){
                for(let item of tab){
                    item.addEventListener('click', this.handlerTab.bind(this));
                    item.addEventListener('hidden.show', this.hiddenShow.bind(this));
                }
            }
        }
        handlerTab(event){
            let trg = event.target.closest(`${this.tabItem}`),
                tab = trg.closest(`${this.tab}`),
                active = tab.querySelector('.active') || false,
                eventCustom = new CustomEvent('hidden.show', {
                    bubbles: true,
                    detail : {
                        tab : tab,
                        target : trg,
                        active : active
                    }
                });
            if(!active) return 'not found active';
            trg.dispatchEvent(eventCustom);
        }
        hiddenShow(event){
            let indTrg = this.index(event.detail.tab.children, event.detail.target),
                indActive = this.index(event.detail.tab.children, event.detail.active),
                collectionTabContainer = document.querySelectorAll(`${this.tabContent}`),
                eventCallback = new CustomEvent('callback', {
                    bubbles:true,
                });
            try{

                event.detail.active.classList.remove('active')
                collectionTabContainer[indActive].classList.remove('active');
                event.detail.target.classList.add('active')
                collectionTabContainer[indTrg].classList.add('active');
                event.detail.target.dispatchEvent(eventCallback);

            }catch (e) {
                console.error(e.message);
            }
        }
        index(collection, element){
            let node = Array.prototype.slice.call(collection);
            return node.indexOf(element);
        }

    }
    document.addEventListener('DOMContentLoaded', function () {
        window.tabs = new Tab();
        tabs.init();
    })
})();