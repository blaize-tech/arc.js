export declare class IPFSClient {
    baseUrl: string;
    constructor(ipfsUrl: string);
    get ipfsUrl(): string;
    cat(hash: string): Promise<any>;
    addString(data: string): Promise<any>;
    pinHash(hash: string): Promise<void>;
    addAndPinString(data: string): Promise<any>;
}
