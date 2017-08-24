import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BlogSharedModule } from '../../shared';
import { BlogAdminModule } from '../../admin/admin.module';
import {
    WishListService,
    WishListPopupService,
    WishListComponent,
    WishListDetailComponent,
    WishListDialogComponent,
    WishListPopupComponent,
    WishListDeletePopupComponent,
    WishListDeleteDialogComponent,
    wishListRoute,
    wishListPopupRoute,
} from './';

const ENTITY_STATES = [
    ...wishListRoute,
    ...wishListPopupRoute,
];

@NgModule({
    imports: [
        BlogSharedModule,
        BlogAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        WishListComponent,
        WishListDetailComponent,
        WishListDialogComponent,
        WishListDeleteDialogComponent,
        WishListPopupComponent,
        WishListDeletePopupComponent,
    ],
    entryComponents: [
        WishListComponent,
        WishListDialogComponent,
        WishListPopupComponent,
        WishListDeleteDialogComponent,
        WishListDeletePopupComponent,
    ],
    providers: [
        WishListService,
        WishListPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BlogWishListModule {}
