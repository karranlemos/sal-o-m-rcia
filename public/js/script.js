const _STATIC_MENU = {
    transitionTime: 200,
    className: 'js-nav-menu'
};
class Menu {
    constructor(menu) {
        this.menu = menu;
        if (!$(menu).hasClass(_STATIC_MENU.className))
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
        const menus = $('.'+_STATIC_MENU.className);
        $.each(menus, (i, menu) => {
            try {
                new Menu(menu);
            }
            catch (err) {
                console.log(`Menu[${i}]: ${err}`);
            }
        });
    }
}



const _STATIC_FORM = {
    className: 'js-form'
};
class Form {
    constructor(form) {
        this.form = form;
        if (!$(this.form).hasClass(_STATIC_FORM.className))
            throw 'Wrong class...';

        this.url = $(this.form).attr('data-url-submit');
        if (!this.url)
            throw "'data-url-submit' attribute not found...";

        this.errorContainer = $(this.form).find('.js-message-box-container');
        if (!this.errorContainer)
            throw "'.js-message-box-container' not found...";

        this.button = $(this.form).find('.js-form-submit:first')[0];
        if (!this.button)
            throw "'.js-form-submit' not found...";


        const formItemsArray = $(this.form).find('.js-form-item');
        this.formItems = {};
        $.each(formItemsArray, (i, formItem) => {
            const name = $(formItem).attr('name');
            if (!name)
                return;
            
            this.formItems[name] = formItem;
        });

        $(this.form).on('submit', this.submitForm);
    }

    submitForm = (e) => {
        e.preventDefault();

        $.ajax({
            method: 'post',
            url: this.url,
            data: this.getFormValues(),
            dataType: 'json'
        }).done((data, textStatus, xhl) => {
            var message;
            if (xhl.responseJSON && xhl.responseJSON.message)
                message = xhl.responseJSON.message;
            else
                message = 'Submitted successfully!';

            this.form.reset();
            this.showSuccess(message);
        }).fail(xhl => {
            var message;
            if (xhl.responseJSON && xhl.responseJSON.message)
                message = xhl.responseJSON.message;
            else
                message = 'Unknown Error.';
            this.showFailure(message);
        });
    };

    getFormValues = () => {
        const formValues = {};
        $.each(this.formItems, (name, formItem) => {
            formValues[name] = $(formItem).val();
        });
        return formValues;
    };



    showSuccess = (message) => {
        this.showMessage(message, 'success');
    }

    showFailure = (message) => {
        this.showMessage(message, 'failure');
    }

    showMessage = (message, type='failure') => {
        $(this.errorContainer).removeClass('hidden');
        $(this.errorContainer).empty();
        $(this.errorContainer).append(`<div class="message-box ${type}">${message}</div>`);
    };



    static initAll() {
        const forms = $('.'+_STATIC_FORM.className);
        $.each(forms, (i, form) => {
            try {
                new Form(form);
            }
            catch (err) {
                console.log(`Form[${i}]: ${err}`);
            }
        });
    }
}



class Helpers {
    constructor() {
        throw 'Static Class...';
    }
}



$(() => {
    Menu.initAll();
    Form.initAll();
})