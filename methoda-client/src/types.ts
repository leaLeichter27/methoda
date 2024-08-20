export interface Status {
    _id?: string;
    id?: string;
    name: string;
    isInitial: boolean;
    isOrphan?: boolean;
    isFinal?: boolean;
}
  
export interface Transition {
    _id?: string;
    name: string;
    fromStatus: Status | string;
    toStatus: Status | string;
}
  