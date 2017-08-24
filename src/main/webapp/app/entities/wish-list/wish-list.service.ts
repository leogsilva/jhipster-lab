import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { JhiDateUtils } from 'ng-jhipster';

import { WishList } from './wish-list.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class WishListService {

    private resourceUrl = 'api/wish-lists';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(wishList: WishList): Observable<WishList> {
        const copy = this.convert(wishList);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(wishList: WishList): Observable<WishList> {
        const copy = this.convert(wishList);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<WishList> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convertItemFromServer(entity: any) {
        entity.creationDate = this.dateUtils
            .convertDateTimeFromServer(entity.creationDate);
    }

    private convert(wishList: WishList): WishList {
        const copy: WishList = Object.assign({}, wishList);

        copy.creationDate = this.dateUtils.toDate(wishList.creationDate);
        return copy;
    }
}
