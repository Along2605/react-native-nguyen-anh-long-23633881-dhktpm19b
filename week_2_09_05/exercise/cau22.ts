interface TodoList{
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

const fetchTodoById = async (id: number) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    const data = await response.json();
    return data;
}

const run = async () => {
    const todos = await Promise.all([
        fetchTodoById(1),
        fetchTodoById(2),
        fetchTodoById(3)
    ])

    todos.forEach(todo => console.log(todo))
} 

run();