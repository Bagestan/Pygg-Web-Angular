export interface qualityTableData {
  CD_OP: number;
  DS_ART: string;
  ID_CLI: number;
  NM_CLI: string;
  RESOL: boolean;
  S_QUA: number;
}

export interface actionsType {
  ID_TP: number;
  DS_TP: string;
}

export interface actionsData {
  DS_ACA: string;
  D_ACA: string;
  D_ADD: string;
  D_EDT: string;
  ID_CLI: number;
  NM_RESP: string;
  S_ACA: number;
  S_QUA: number;
  TP_ACA: number;
  USU_ADD: number;
  USU_EDT: number;
}

export interface QualityItem {
  ID_CLI: number;
  S_QUA: number;
  CD_OP: number;
  CD_CLI: number;
  NM_CLI: number;
  D_QUA: string;
  DS_DEF: string;
  newD_QUA: string;
  DS_ART: string;
  NM_RESP: string;
  RESOL: boolean;
}

export interface deleteData {
  table: string;
  ID_CLI: number;
  S_QUA: number;
  S_ACA: number;
}
