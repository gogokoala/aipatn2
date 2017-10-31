export interface sf1Data {
    pid: string
    sysid: string
    appNumber: string
    pubNumber: string
    appDate: string
    pubDate: string
    title: string
    ipc: string
    applicantName: string
    inventroName: string
    priority: string
    agencyName: string
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
    gazettePage: number
    gazetteCount: number
    statusCode: number
    familyNo: string
}

export interface sectionInfo {
    sectionName: string
    recordNum: number
}

export interface sf1Response {
    status: number
    message: string
    total: number
    from: number
    to: number
    results: sf1Data[]
    sectionInfos: sectionInfo[]
}
