interface TodoList{
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

const fetchTodo = async (): Promise<TodoList> => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data: TodoList = await response.json();
    return data;
}

const run = async () => {
    const data = await fetchTodo();
    console.log(data);
}

run()