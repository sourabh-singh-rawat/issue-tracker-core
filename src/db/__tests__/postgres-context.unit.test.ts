import { Pool } from "pg";
import { PostgresContext } from "../postgres-context";

describe("PostgresContext", () => {
  // Arrange
  const mockRelease = jest.fn();

  const mockQueryResult = { rows: [], rowCount: 0 };
  const mockQuery = jest.fn().mockResolvedValue(mockQueryResult);

  const mockConnect = jest.fn().mockResolvedValue({
    query: mockQuery,
    release: mockRelease,
  });

  const mockPool: Pool = { connect: mockConnect } as unknown as Pool;

  it("client is selected from the pool", async () => {
    const ctx = new PostgresContext(mockPool);
    // Act
    ctx.query("SELECT * FROM users", undefined);

    // Assert
    expect(mockConnect).toBeCalled();
  });

  it("query is executed", async () => {
    const ctx = new PostgresContext(mockPool);

    // Act
    const result = await ctx.query("SELECT * FROM users");

    // Assert
    expect(mockQuery).toBeCalled();
    expect(result).toBe(mockQueryResult);
  });

  it("client is released back to the pool", async () => {
    const ctx = new PostgresContext(mockPool);
    // Act
    ctx.query("SELECT * FROM users", undefined);

    // Assert
    expect(mockRelease).toBeCalled();
  });

  it.todo("throws a PoolNotFound error if clientPool is not valid");
  it.todo("throws a QueryFailed error if query execution failed");
});
