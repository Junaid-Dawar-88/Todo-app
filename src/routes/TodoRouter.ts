import { PrismaClient } from "@prisma/client";
import { Await } from "react-router-dom";

const prisma = new PrismaClient();

interface todo {
    id: number
    title: string;
    description: string;
    status: string;
    priority: string;
    due_date: string;
}


export const TodoRouter = {

    "/api/todos": {

        async GET(req: Request) {
            try {
                const todoData = await prisma.todos.findMany();
                return new Response(JSON.stringify(todoData));
            } catch (error) {
                console.log("GET method failed:", error);
                return new Response("GET failed", { status: 500 });
            }
        },

        async POST(req: Request) {
            try {
                const body = await req.json() as todo;
                const todoData = await prisma.todos.create({
                    data: {
                        title: body.title,
                        description: body.description,
                        status: body.status,
                        priority: body.priority,
                        due_date: body.due_date,
                    },
                });
                return Response.json(todoData);
            } catch (error) {
                console.log("POST method failed:", error);
                return new Response("POST failed", { status: 500 });
            }
        },
    },
     "/api/todos/:id": {
        async PUT(req: Request) {
            try {
                const id = Number(req.url.split("/").pop());
                const body = (await req.json()) as todo;

                const updatedTodo = await prisma.todos.update({
                    where: { id },
                    data: {
                        title: body.title,
                        description: body.description,
                        status: body.status,
                        priority: body.priority,
                        due_date: body.due_date,
                    },
                });

                return new Response(JSON.stringify(updatedTodo), {
                    headers: { "Content-Type": "application/json" },
                });
            } catch (error) {
                console.log("PUT method failed:", error);
            }
        },

        async DELETE(req: Request) {
            try {
                const id = Number(req.url.split("/").pop());
                // const body = await req.json()  as todo
                // const id = Number(body.id)
                await prisma.todos.delete({
                    where: { id },
                });

                return new Response("Todo deleted", { status: 200 });
            } catch (error) {
                console.log("DELETE method failed:", error);
                return new Response("DELETE failed", { status: 500 });
            }
        },
    },

};
