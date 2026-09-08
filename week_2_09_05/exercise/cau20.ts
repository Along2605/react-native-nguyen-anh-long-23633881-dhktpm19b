interface Book{
    id: number;
    title: string;
    price: number;
}

const fetchBookDetail = (bookId: number): Promise<Book> =>{
    return new Promise<Book>((resolve) =>{
        setTimeout(() => {
            resolve({
                id: 1,
                title: "De men phieu luu ky",
                price: 500
            })
        },4000)
    })
}

const timeout = (ms: number):Promise<never> => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("Ket noi qua lau, vui long thu lai"));
        }, ms)
    })
}

const fetchBookDetailWithTimeout = async (bookId: number): Promise<Book> =>{
    return await Promise.race([fetchBookDetail(bookId), timeout(3000)])
}

const loadBookScreen = async (bookId: number) =>{
    console.log("Dang tai thong tin sach...");
    try {
        const book = await fetchBookDetailWithTimeout(bookId);
        console.log("Tai thanh cong: ", book);
    } catch (error) {
        console.log("Hien thi len UI", (error as Error).message)
    }
}

loadBookScreen(101);