import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
@Injectable({
    providedIn: 'root'
})

export class AdminService {
    constructor(private httpClient : HttpClient){}
    getTable(TABLE) : Observable<any>{
        const params = new HttpParams()
        .set("TABLE" , TABLE)
        return this.httpClient.get("/api/getTable",{params})
    };
    getAvailableTable(KEYWORD) : Observable<any>{
        const params = new HttpParams()
        .set("KEYWORD" , KEYWORD)
        return this.httpClient.get("/api/getAvailableTable",{params})
    };
    getLog(LOG_TYPE,LIMIT) : Observable<any>{
        const params = new HttpParams()
        .set("LOG_TYPE" , LOG_TYPE)
        .set("LIMIT" , LIMIT)
        return this.httpClient.get("/api/getLog",{params})
    }



}