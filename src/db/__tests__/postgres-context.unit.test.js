"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_context_1 = require("../postgres-context");
describe("PostgresContext", () => {
    // Arrange
    const mockRelease = jest.fn();
    const mockQueryResult = { rows: [], rowCount: 0 };
    const mockQuery = jest.fn().mockResolvedValue(mockQueryResult);
    const mockConnect = jest.fn().mockResolvedValue({
        query: mockQuery,
        release: mockRelease,
    });
    const mockPool = { connect: mockConnect };
    it("client is selected from the pool", () => __awaiter(void 0, void 0, void 0, function* () {
        const ctx = new postgres_context_1.PostgresContext(mockPool);
        // Act
        ctx.query("SELECT * FROM users", undefined);
        // Assert
        expect(mockConnect).toBeCalled();
    }));
    it("query is executed", () => __awaiter(void 0, void 0, void 0, function* () {
        const ctx = new postgres_context_1.PostgresContext(mockPool);
        // Act
        const result = yield ctx.query("SELECT * FROM users");
        // Assert
        expect(mockQuery).toBeCalled();
        expect(result).toBe(mockQueryResult);
    }));
    it("client is released back to the pool", () => __awaiter(void 0, void 0, void 0, function* () {
        const ctx = new postgres_context_1.PostgresContext(mockPool);
        // Act
        ctx.query("SELECT * FROM users", undefined);
        // Assert
        expect(mockRelease).toBeCalled();
    }));
    it.todo("throws a PoolNotFound error if clientPool is not valid");
    it.todo("throws a QueryFailed error if query execution failed");
});
