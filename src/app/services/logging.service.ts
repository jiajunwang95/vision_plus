import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
@Injectable({
    providedIn: 'root'
})

export class LoggingService {
    USER;SESSION_ID;
    public data = new BehaviorSubject<boolean>(false);
    constructor(private httpClient : HttpClient){}
    loggingUserAction(USER,ACTION,SESSION_ID) : Observable<any>{
        const params = new HttpParams()
        .set("USER" , USER)
        .set("ACTION", ACTION)
        .set("SESSION_ID", SESSION_ID)
        return this.httpClient.get("/api/logging",{params})
    }
    setUser() : Observable<any>{
        this.USER = "jiajunwang";
        return this.USER;
    }
    getUser(){
        return this.USER;
    }
    setUniqueSession(){
        this.SESSION_ID = Math.floor(Date.now() * Math.random());
        return this.SESSION_ID;
    }
    getUniqueSession(){
        return this.SESSION_ID;
    }
    exitSession(){
        this.USER = '';this.SESSION_ID = '';
    }

}