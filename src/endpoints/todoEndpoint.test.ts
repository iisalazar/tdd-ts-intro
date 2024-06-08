import {It, Mock, Times} from "moq.ts";
import {ITodoRepository} from "../repository/todoRepository";
import {TodoEndpoint} from "./todoEndpoint";
import {Todo} from "../models/Todo";
import { Request, Response, NextFunction} from "express";

const createDependencies = () => {
   const mockTodoRepository = new Mock<ITodoRepository>() ;
   return {
         todoRepository: mockTodoRepository
   }
}
describe("Test suite for todoEndpoint", () => {
    describe("getTodos()", () => {
        it('when valid values passed, should call repository and return result', async () => {
            // Arrange
            const deps = createDependencies();
            const expectedResult: Todo[] = [
                new Todo("1", "title1", false),
                new Todo("2", "title2", true)
            ];
            deps.todoRepository.setup(x => x.getTodos()).returns(Promise.resolve(expectedResult));
            const sut = new TodoEndpoint({
                todoRepository: deps.todoRepository.object()
            });
            const req = {} as Request;
            const res = {
                json: jest.fn()
            } as any;
            const next = {} as NextFunction;
            // Act
            await sut.getTodos(req, res, next);
            // Assert
            deps.todoRepository.verify(x => x.getTodos(), Times.Once());
            expect(res.json).toBeCalledWith([
                {
                    id: "1",
                    title: "title1",
                    completed: false
                },
                {
                    id: "2",
                    title: "title2",
                    completed: true
                }
            ]);
        });
    })
    describe("addTodo()", () => {
        it('when request does not contain title, should return status code 400', async () => {
            const deps = createDependencies();
            const sut = new TodoEndpoint({
                todoRepository: deps.todoRepository.object()
            });
            const req = {
                body: {
                    completed: false
                }
            } as any;
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            } as any;
            const next = {} as NextFunction;
            // Act
            await sut.addTodo(req, res, next);
            // Assert
            expect(res.status).toBeCalledWith(400);
        })
        it('when valid values passed, should call repository and return result', async () => {
            // Arrange
            const deps = createDependencies();
            const sut = new TodoEndpoint({
                todoRepository: deps.todoRepository.object()
            });
            deps.todoRepository.setup(x => x.addTodo(It.IsAny<Todo>())).returns(Promise.resolve());
            const req = {
                body: {
                    title: "title1",
                    completed: false
                }
            } as any;
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            } as any;
            const next = {} as NextFunction;
            // Act
            await sut.addTodo(req, res, next);
            // Assert
            deps.todoRepository.verify(x => x.addTodo(It.IsAny<Todo>()), Times.Once());
        });
    });
    describe("deleteTodoById()", () => {
        it('when valid values passed, should call repository and return result', async () => {
            // Arrange
            const deps = createDependencies();
            const sut = new TodoEndpoint({
                todoRepository: deps.todoRepository.object()
            });
            deps.todoRepository.setup(x => x.deleteTodoById(It.IsAny<string>())).returns(Promise.resolve());
            const req = {
                params: {
                    id: "1"
                }
            } as any;
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            } as any;
            const next = {} as NextFunction;
            // Act
            await sut.deleteTodoById(req, res, next);
            // Assert
            deps.todoRepository.verify(x => x.deleteTodoById(It.IsAny<string>()), Times.Once());
        });
    });
});