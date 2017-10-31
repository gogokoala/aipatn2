import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pat-complex',
  templateUrl: './complex.component.html',
  styleUrls: ['./complex.component.css']
})
export class ComplexComponent implements OnInit {

  result_num = 0;
  dbgroups: any[] = [
    { id: 0, name: '全部数据', sub_types: [] },
    {
      id: 1, name: '中国', sub_types: [
        { id: 1, code: 'FMZL', name: '中国发明专利' },
        { id: 2, code: 'FMSQ', name: '中国发明授权' },
        { id: 3, code: 'SYXX', name: '中国实用新型' },
        { id: 4, code: 'WGZL', name: '中国外观专利' },
        { id: 5, code: 'TWZL', name: '台湾' },
        { id: 6, code: 'HKPATENT', name: '香港' },
      ]
    },
    {
      id: 2, name: '主要国家和组织', sub_types: [
        { id: 1, code: 'USPATENT', name: '美国' },
        { id: 2, code: 'GBPATENT', name: '英国' },
        { id: 3, code: 'FRPATENT', name: '法国' },
        { id: 4, code: 'DEPATENT', name: '德国' },
        { id: 5, code: 'CHPATENT', name: '瑞士' },
        { id: 6, code: 'JPPATENT', name: '日本' },
        { id: 7, code: 'RUPATENT', name: '俄罗斯' },
        { id: 8, code: 'KRPATENT', name: '韩国' },
        { id: 9, code: 'EPPATENT', name: '欧洲专利局(EPO)' },
        { id: 10, code: 'WOPATENT', name: '世界知识产权组织(WIPO)' },
      ]
    },
    {
      id: 3, name: '其它国家和地区', sub_types: [
        { id: 1, code: 'GCPATENT', name: '阿拉伯' },
        { id: 2, code: 'AUPATENT', name: '澳大利亚' },
        { id: 3, code: 'CAPATENT', name: '加拿大' },
        { id: 4, code: 'ESPATENT', name: '西班牙' },
        { id: 5, code: 'ATPATENT', name: '奥地利' },
        { id: 6, code: 'ITPATENT', name: '意大利' },
        { id: 7, code: 'APPATENT', name: '非洲地址' },
        { id: 8, code: 'SEPATENT', name: '瑞典' },
        { id: 9, code: 'ASPATENT', name: '东南亚' },
        { id: 10, code: 'OTHERPATENT', name: '更多其它国家' },
      ]
    },
  ];
  key_group: any[] = [
    { id: 1, name: '', title: '所有字段' },
    { id: 2, name: '', title: '专利名称/摘要' },
    { id: 3, name: '', title: '专利名称/摘要/权利要求' },
    { id: 4, name: '', title: '专利名称' },
    { id: 5, name: '', title: '摘要' },
    { id: 6, name: '', title: '权利要求' },
    { id: 8, name: '', title: '说明书' },
  ];
  date_group: any[] = [
    { id: 1, name: '', title: '申请日' },
    { id: 2, name: '', title: '公开（公告）日' },
    { id: 3, name: '', title: '授权日' },
  ];
  code_group: any[] = [
    { id: 1, name: '', title: '申请号' },
    { id: 2, name: '', title: '公开（公告）号' },
    { id: 3, name: '', title: '优先权号' },
  ];
  type_group: any[] = [
    { id: 1, name: '', title: '国际分类号（IPC）' },
    { id: 2, name: '', title: '外观分类(Locarno)' },
  ];
  name_group: any[] = [
    { id: 1, name: '', title: '申请（专利权）人' },
    { id: 2, name: '', title: '当前专利权人' },
    { id: 3, name: '', title: '股票代码' },
    { id: 4, name: '', title: '发明人' },
    { id: 5, name: '', title: '代理人' },
    { id: 6, name: '', title: '代理机构' },
    { id: 8, name: '', title: '申请人地址' },
  ];


  constructor() { }

  ngOnInit() {
  }

}
