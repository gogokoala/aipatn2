import { Injectable } from '@angular/core'
import { Headers, Http } from '@angular/http';

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';

export interface SF1Data {
  pid: string
  sysid: string
  appNumber: string
  pubNumber: string
  appDate: string
  pubDate: string
  title: string
  ipc: Array<string>
  applicantName: Array<string>
  inventroName: Array<string>
  priority: string
  agencyName: Array<string>
  agentName: string
  addrProvince: string
  addrCity: string
  addrCounty: string
  address: string
  patType: string
  iapp: string
  ipub: string
  den: string
  abs: string
  lprs: string
  dbName: string
  tifDistributePath: string
  pages: string
  relevance: string
  proCode: string
  appCoun: string
  gazettePath: string
  gazettePage: string
  gazetteCount: string
  statusCode: string
  familyNo: string
}

export interface SF1SectionInfo {
  sectionName: string
  recordNum: number
}

export interface SF1Response {
  status: string
  message: string
  total: number
  from: number
  to: number
  results: Array<SF1Data>
  sectionInfos: Array<SF1SectionInfo>
}

export interface PatentGroup {
  code: string
  name: string
}

export interface PatentDatabase {
  code: string
  name: string
  group: string
}

@Injectable()
export class SF1Service {

  private headers = new Headers({'Content-Type': 'application/json'})
  private sf1Url = 'http://www.aipatn.com/api/sf1'

  private dbGroups: Array<PatentGroup> = [
    {name: '中国', code: 'CN'},
    {name: '主要国家和组织', code: 'MAIN'},
    {name: '其它国家和地区', code: 'OTHERS'},
  ]

  private dbNames: Array<PatentDatabase> = [
        { code: 'FMZL', name: '中国发明专利', group: 'CN' },
        { code: 'FMSQ', name: '中国发明授权', group: 'CN' },
        { code: 'SYXX', name: '中国实用新型', group: 'CN' },
        { code: 'WGZL', name: '中国外观专利', group: 'CN' },
        { code: 'TWZL', name: '台湾', group: 'CN' },
        { code: 'HKPATENT', name: '香港', group: 'CN' },

        { code: 'USPATENT', name: '美国', group: 'MAIN' },
        { code: 'GBPATENT', name: '英国', group: 'MAIN' },
        { code: 'FRPATENT', name: '法国', group: 'MAIN' },
        { code: 'DEPATENT', name: '德国', group: 'MAIN' },
        { code: 'CHPATENT', name: '瑞士', group: 'MAIN' },
        { code: 'JPPATENT', name: '日本', group: 'MAIN' },
        { code: 'RUPATENT', name: '俄罗斯', group: 'MAIN' },
        { code: 'KRPATENT', name: '韩国', group: 'MAIN' },
        { code: 'EPPATENT', name: '欧洲专利局(EPO)', group: 'MAIN' },
        { code: 'WOPATENT', name: '世界知识产权组织(WIPO)', group: 'MAIN' },

        { code: 'GCPATENT', name: '阿拉伯', group: 'OTHERS' },
        { code: 'AUPATENT', name: '澳大利亚', group: 'OTHERS' },
        { code: 'CAPATENT', name: '加拿大', group: 'OTHERS' },
        { code: 'ESPATENT', name: '西班牙', group: 'OTHERS' },
        { code: 'ATPATENT', name: '奥地利', group: 'OTHERS' },
        { code: 'ITPATENT', name: '意大利', group: 'OTHERS' },
        { code: 'APPATENT', name: '非洲地址', group: 'OTHERS' },
        { code: 'SEPATENT', name: '瑞典', group: 'OTHERS' },
        { code: 'ASPATENT', name: '东南亚', group: 'OTHERS' },
        { code: 'OTHERPATENT', name: '更多其它国家', group: 'OTHERS' },
  ]

  constructor(private http: Http) { }

  /**
   *
   * @param searchConditions (string) 查询条件
   */
  getList(searchConditions: string): Observable<SF1Response> {
    return this.http.post(
      this.sf1Url,
      JSON.stringify({exp: searchConditions}),
      { headers: this.headers }
    ).map(response => {
      const res = response.json()
      console.log(res)
      if (res.code === 0 && res.data) {
        return res.data as SF1Response
      }
      return undefined
    })
  }

  getDatabase(code: string) {
    let el: PatentDatabase
    for (let i = 0; i < this.dbNames.length; i++) {
      el = this.dbNames[i]
      if (code === el.code) {
        return el
      }
    }

    return undefined
  }

  formatString(s: string, keywords: Array<string>): string {
    if (s && keywords) {
    }

    return ''
  }
}

