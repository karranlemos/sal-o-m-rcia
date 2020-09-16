const _STATIC_MENU = {
    transitionTime: 200
};
class Menu {
    constructor(menu) {
        this.menu = menu;
        if (!$(menu).hasClass('js-nav-menu'))
            throw 'Wrong class...';
        
        this.mobileMenuButton = $(menu).find('.mobile-menu-button')[0];
        if (!this.mobileMenuButton)
            throw "'.mobile-menu-button' not found...";

        this.menuOptions = $(menu).find('.nav-options')[0];
        if (!this.mobileMenuButton)
            throw "'.nav-options' not found...";

        $(this.menuOptions).animate({right: '-100%'}, 0);
        $(this.mobileMenuButton).click(() => {
            this.toggleMenu();
        });

        $(window).click((e) => {
            console.log($(this.menu).find(e.target));
            if (this.menu != e.target && $(this.menu).find(e.target).length === 0)
                this.closeMenu();
        });
    }

    toggleMenu = () => {
        

        if (this.isMenuOpen())
            this.closeMenu();
        else
            this.openMenu();
    };

    closeMenu = () => {
        $(this.menuOptions).animate({right: '-100%'}, _STATIC_MENU.transitionTime);
        setTimeout(() => $(this.menu).removeClass('show'), _STATIC_MENU.transitionTime+10);
    };

    openMenu = () => {
        $(this.menu).addClass('show');
        $(this.menuOptions).animate({right: 0}, _STATIC_MENU.transitionTime);
    };

    isMenuOpen = () => {
        return $(this.menu).hasClass('show');
    };



    static initAll() {
        const menus = $('.js-nav-menu');
        $.each(menus, (i, menu) => {
            try {
                new Menu(menu);
            }
            catch (err) {
                console.log(`Menu[${i}]: ${err}`);
            }
        })
    }
}

$(() => {
    Menu.initAll();
})