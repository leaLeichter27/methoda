export interface Status {
    _id?: string;
    name: string;
    isInitial: boolean;
    isOrphan?: boolean;
    isFinal?: boolean;
}
  
export interface Transition {
    id?: string;
    name: string;
    fromStatus: Status | string;
    toStatus: Status | string;
}
  