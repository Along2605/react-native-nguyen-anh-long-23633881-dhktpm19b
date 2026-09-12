interface NewPost{
    title: string;
    body: string,
    userId: number
}

interface PostResponse extends NewPost{
    id: number
}

const postData = async(newPost: NewPost): Promise<PostResponse> =>{
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPost)
    })

    const data: PostResponse = await response.json();
    return data;
}

const run = async () => {
    const result = await postData({
        title: "Bookstore Online",
        body: "Học async trong React Native",
        userId: 1
    })
    console.log(result);
}

run()