import { browser, element, by, $ } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';
const path = require('path');

describe('WishList e2e test', () => {

    let navBarPage: NavBarPage;
    let wishListDialogPage: WishListDialogPage;
    let wishListComponentsPage: WishListComponentsPage;
    const fileToUpload = '../../../../main/webapp/content/images/logo-jhipster.png';
    const absolutePath = path.resolve(__dirname, fileToUpload);
    

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load WishLists', () => {
        navBarPage.goToEntity('wish-list');
        wishListComponentsPage = new WishListComponentsPage();
        expect(wishListComponentsPage.getTitle()).toMatch(/blogApp.wishList.home.title/);

    });

    it('should load create WishList dialog', () => {
        wishListComponentsPage.clickOnCreateButton();
        wishListDialogPage = new WishListDialogPage();
        expect(wishListDialogPage.getModalTitle()).toMatch(/blogApp.wishList.home.createOrEditLabel/);
        wishListDialogPage.close();
    });

    it('should create and save WishLists', () => {
        wishListComponentsPage.clickOnCreateButton();
        wishListDialogPage.setNameInput('name');
        expect(wishListDialogPage.getNameInput()).toMatch('name');
        wishListDialogPage.setCreationDateInput(12310020012301);
        expect(wishListDialogPage.getCreationDateInput()).toMatch('2001-12-31T02:30');
        wishListDialogPage.getHiddenInput().isSelected().then(function (selected) {
            if (selected) {
                wishListDialogPage.getHiddenInput().click();
                expect(wishListDialogPage.getHiddenInput().isSelected()).toBeFalsy();
            } else {
                wishListDialogPage.getHiddenInput().click();
                expect(wishListDialogPage.getHiddenInput().isSelected()).toBeTruthy();
            }
        });
        wishListDialogPage.userSelectLastOption();
        wishListDialogPage.save();
        expect(wishListDialogPage.getSaveButton().isPresent()).toBeFalsy();
    }); 

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class WishListComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-wish-list div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class WishListDialogPage {
    modalTitle = element(by.css('h4#myWishListLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));
    creationDateInput = element(by.css('input#field_creationDate'));
    hiddenInput = element(by.css('input#field_hidden'));
    userSelect = element(by.css('select#field_user'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function (name) {
        this.nameInput.sendKeys(name);
    }

    getNameInput = function () {
        return this.nameInput.getAttribute('value');
    }

    setCreationDateInput = function (creationDate) {
        this.creationDateInput.sendKeys(creationDate);
    }

    getCreationDateInput = function () {
        return this.creationDateInput.getAttribute('value');
    }

    getHiddenInput = function () {
        return this.hiddenInput;
    }
    userSelectLastOption = function () {
        this.userSelect.all(by.tagName('option')).last().click();
    }

    userSelectOption = function (option) {
        this.userSelect.sendKeys(option);
    }

    getUserSelect = function () {
        return this.userSelect;
    }

    getUserSelectedOption = function () {
        return this.userSelect.element(by.css('option:checked')).getText();
    }

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
