import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { debug } from 'debug';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class CniprService {

  private moment = require('moment');
  private debug = new debug('CniprService');
  private cniprUrl = 'https://open.cnipr.com';
  private headers = new Headers({'Content-Type': 'application/json'});
  private cniprConf = {
    clientID: 'ABEC0BD17688BC6F4DEDA73E07B2B18B',
    clientSecret: '72D242D2448ED0899E66B9B4C4343716',
    redirectURI: 'https://www.getpostman.com/oauth2/callback',
    user: 'jsth001',
    password: '123456',
    defaultState: 'aipath.com',
    authorizationCode: '',
    accessToken: {
      expires_in: 0,
      refresh_token: '',
      access_token: '',
      last_refresh_time: '', //
    },
  };

  constructor(private http: Http) {
    debug('CniprService start.');
  }

  getAuthorizationCode(): Promise<void> {
    const url = `${this.cniprUrl}/oauth2/authorize`;
    const param = {
      client_id: this.cniprConf.clientID,
      redirect_uri: this.cniprConf.redirectURI,
      response_type: 'code',
      state: this.cniprConf.defaultState,
      user: this.cniprConf.user,
      password: this.cniprConf.password,
    };
    return this.http.get(url, {params: param})
    .toPromise()
    .then(() => null)
    .catch(this.handleError);
  }

  setAuthorizationCode(code: any) {
    this.cniprConf.authorizationCode = code;
  }

  getAccessToken(): Promise<any> {
    const url = `${this.cniprUrl}/oauth2/access_token`;
    const param = {
      client_id: this.cniprConf.clientID,
      client_secret: this.cniprConf.clientSecret,
      redirect_uri: this.cniprConf.redirectURI,
      grant_type: 'authorization_code',
      code: this.cniprConf.authorizationCode,
      state: this.cniprConf.defaultState,
    };
    return this.http.get(url, {params: param, headers: this.headers})
    .toPromise()
    .then(res => {
      const rdata = res.json().data;
      if (rdata.status === 0) {
        this.cniprConf.accessToken = {
          expires_in: rdata.expires_in,
          refresh_token: rdata.refresh_token,
          access_token: rdata.access_token,
          last_refresh_time: '', //
        };
      }
    })
    .catch(this.handleError);
  }

  refreshAccessToken(): Promise<any> {
    const url = `${this.cniprUrl}/oauth2/access_token`;
    const param = {
      client_id: this.cniprConf.clientID,
      client_secret: this.cniprConf.clientSecret,
      redirect_uri: this.cniprConf.redirectURI,
      grant_type: 'refresh_token',
      refresh_token: this.cniprConf.accessToken.refresh_token,
      state: this.cniprConf.defaultState,
    };
    return this.http.get(url, {params: param, headers: this.headers})
    .toPromise()
    .then(res => {
      const rdata = res.json().data;
      if (rdata.status === 0) {
        this.cniprConf.accessToken = {
          expires_in: rdata.expires_in,
          refresh_token: rdata.refresh_token,
          access_token: rdata.access_token,
          last_refresh_time: '', //
        };
      }
    })
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    debug('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
