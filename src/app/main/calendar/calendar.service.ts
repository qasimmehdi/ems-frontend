import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { from, Observable } from 'rxjs';

const BASE_URL_ACCOUNT = environment.apiUrl;

@Injectable({
    providedIn: 'root'
})

export class CalendarService {

    constructor(private _httpClient: HttpClient) { }

    getTrainerSchedule(trainerId: string, startTime, endTime): Observable<any> {
        const Resp = from(new Promise((resolve) => {
            const promises = [];
            let data = [];
            for (let i = startTime + 1; i < endTime; i += 86400) {
                const promise = this.getTrainerScheduleByDay(trainerId, i)
                    .then(resp => {
                        if (resp.length > 0) {
                            data.push(...resp);
                        }
                    });
                promises.push(promise);
            }
            Promise.all(promises)
                .then(() => {
                    resolve(data);
                })
        }))
        return Resp;

    }

    getTrainerScheduleByDay(trainerId: string, date): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(`${BASE_URL_ACCOUNT}/admin/trainers/getAppointmentsByDate?trainerId=${trainerId}&date=${date}`)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        })
    }
}