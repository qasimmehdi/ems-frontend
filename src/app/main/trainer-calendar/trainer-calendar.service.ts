import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot } from '@angular/router';
import { environment } from 'environments/environment';

const BASE_URL = environment.baseUrl;
const BASE_URL_ACCOUNT = environment.apiaccountUrl;

@Injectable({
  providedIn: 'root'
})

export class TrainerCalendarService {}