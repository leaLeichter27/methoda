export interface Status {
    id: string;
    name: string;
    isInitial: boolean;
}
  
export interface Transition {
    id: string;
    name: string;
    fromStatus: Status;
    toStatus: Status;
}
  