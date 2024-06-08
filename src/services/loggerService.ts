import {IHttpClientService} from "./IHttpClientService";

export interface ILoggerService {
    logInfo(message: string): Promise<void>;
    logError(message: string): void;
    logWarning(message: string): void;
    logDebug(message: string): void;
}

class LoggerService implements ILoggerService {
    private readonly httpClientService: IHttpClientService;
    private readonly baseUrl = "https://eo8ynw3hi8mu3ik.m.pipedream.net";
    public constructor({
                             _httpClientService
                          }: { _httpClientService: IHttpClientService }) {
          this.httpClientService = _httpClientService;
     }

    async logInfo(message: string): Promise<void> {
        const msg = "INFO: " + message;
        await this.httpClientService.post(this.baseUrl, msg)
    }

    logError(message: string) {
        console.log(`ERROR: ${message}`);
    }

    logWarning(message: string) {
        console.log(`WARNING: ${message}`);
    }

    logDebug(message: string) {
        console.log(`DEBUG: ${message}`);
    }
}

export default LoggerService;