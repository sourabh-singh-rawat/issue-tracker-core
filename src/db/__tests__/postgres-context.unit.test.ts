import { PostgresContext } from "../..";
import { DataSource } from "typeorm";

// Arrange
const mockDataSource: DataSource = {
  ...jest.requireActual("typeorm").DataSource.prototype,
  initialize: jest.fn(),
  createQueryBuilder: jest.fn(),
  query: jest.fn(),
};

const context = new PostgresContext(mockDataSource);

it("can connect with the datasource", async () => {
  // Act
  await context.connect();
  // Assert
  expect(mockDataSource.initialize).toHaveBeenCalled();
});

it("execute a sql query", async () => {
  // Act
  // context.query("SELECT * FROM user_exists_by_id($1)",  ,["someid"]);

  // Assert
  expect(mockDataSource.query).toHaveBeenCalled();
});

it("can create a query builder", async () => {
  // Act
  // Assert
});

it("client is released back to the pool", async () => {
  // Act
  // Assert
});

it.todo("throws a PoolNotFound error if clientPool is not valid");
it.todo("throws a QueryFailed error if query execution failed");
