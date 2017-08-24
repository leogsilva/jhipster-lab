import { BaseEntity, User } from './../../shared';

export class WishList implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public creationDate?: any,
        public hidden?: boolean,
        public user?: User,
    ) {
        this.hidden = false;
    }
}
