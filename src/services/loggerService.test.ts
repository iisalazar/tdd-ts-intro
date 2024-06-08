import {Mock, Times} from "moq.ts";
import {IHttpClientService} from "./IHttpClientService";
import LoggerService from "./loggerService";

const createDependencies = () => {
    const _httpClientService = new Mock<IHttpClientService>();
    return {
        _httpClientService
    };
}
describe("Test suite for LoggerService", () => {
    describe('logInfo()', () => {
        it('should call httpClientService.post() with correct message', async () => {
            // Arrange
            const message = "Hello, World!";
            const dependencies = createDependencies();
            dependencies._httpClientService.setup(x => x.post("https://eo8ynw3hi8mu3ik.m.pipedream.net", "INFO: " + message)).returns(Promise.resolve("POST response"));
            const sut = new LoggerService({
                _httpClientService: dependencies._httpClientService.object()
            });

            // Act
            await sut.logInfo(message);

            // Assert
            dependencies._httpClientService.verify(x => x.post("https://eo8ynw3hi8mu3ik.m.pipedream.net", "INFO: " + message), Times.Once());
        });
    });
});