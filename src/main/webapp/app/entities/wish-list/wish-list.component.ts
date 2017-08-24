import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager, JhiParseLinks, JhiPaginationUtil, JhiLanguageService, JhiAlertService } from 'ng-jhipster';

import { WishList } from './wish-list.model';
import { WishListService } from './wish-list.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-wish-list',
    templateUrl: './wish-list.component.html'
})
export class WishListComponent implements OnInit, OnDestroy {
wishLists: WishList[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private wishListService: WishListService,
        private alertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.wishListService.query().subscribe(
            (res: ResponseWrapper) => {
                this.wishLists = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInWishLists();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: WishList) {
        return item.id;
    }
    registerChangeInWishLists() {
        this.eventSubscriber = this.eventManager.subscribe('wishListListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
