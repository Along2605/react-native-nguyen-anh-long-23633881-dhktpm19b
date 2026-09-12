
interface Todo{
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

const fetchTodo= async () : Promise<Todo[]>  => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
    const data: Todo[] = await response.json();
    return data;
}

const run = async () =>{
    const data = await fetchTodo();
    const filteredData = data.filter(todo => todo.completed === true).slice(0,10);
    filteredData.forEach(todo => console.log(todo));
}

run();