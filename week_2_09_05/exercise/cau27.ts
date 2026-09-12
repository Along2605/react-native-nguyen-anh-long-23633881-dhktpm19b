interface Todo{
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

const fetchWithRetry = async <T>(url: string, retries: number): Promise<T> =>{ 
    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data: T = await response.json();
        return data;
        
    } catch (error) {
        if(retries > 0){
            console.log(`Lỗi đang thử lại.... còn ${retries} lần`);
            return fetchWithRetry(url, retries-1);
        }
        else{
            throw error;
        }
    }
}

const run = async () => {
    try {
        const todo = await fetchWithRetry<Todo>( "https://jsonplaceholder.typicode.com/tod",
      3);
      console.log(todo);
        
    } catch (error) {
        console.log((error as Error).message)
    }
}

run();