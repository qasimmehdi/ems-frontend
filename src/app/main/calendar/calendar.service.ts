import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { from, Observable } from 'rxjs';

const BASE_URL_APP = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})

export class CalendarService {

    constructor(private _httpClient: HttpClient) { }

    getTrainerSchedule(trainerId: string, startTime, endTime): Observable<any> {
        const Resp = from(new Promise((resolve) => {
            const promises = [];
            let data = [];
            this.getScheduleDays(trainerId, startTime)
                .then((res: any) => {
                    res.forEach((item) => {
                        console.log(startTime, endTime, (item >= startTime && item <= endTime ? item+' out' : item+' in '));
                        if (item >= startTime && item <= endTime) {
                            const promise = this.getTrainerScheduleByDay(trainerId, item)
                                .then(resp => {
                                    if (resp.length > 0) {
                                        data.push(...resp);
                                    }
                                })
                            promises.push(promise);
                        }
                    });
                    Promise.all(promises)
                        .then(() => {
                            resolve(data);
                        })
                })
                .catch(err => {
                    console.log(err);
                    return [];
                })
        }))
        return Resp;
    }

    getTrainerScheduleByDay(trainerId: string, date): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${BASE_URL_APP}/admin/trainers/getAppointmentsByDate?trainerId=${trainerId}&date=${date}`)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        })
    }

    getScheduleDays(trainerId: string, startDate) {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${BASE_URL_APP}/admin/trainers/dots/${trainerId}/${startDate}`)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        })
    }


}