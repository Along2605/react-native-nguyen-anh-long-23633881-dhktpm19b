interface User{
    id: number;
    name: string;
}

const fetchUser = (id: number): Promise<User> => {
    return new Promise<User>((resolve) => {
        setTimeout(() => {
            resolve({
                id: id,
                name: `User ${id}`
            })
        },1000)
    })

}

const run = async () => {
    const user = await fetchUser(1);
    console.log(user);
}

run();