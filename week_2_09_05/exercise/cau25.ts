const downloadFile = async (): Promise<void> => {
    return new Promise<void>((r) => {
        console.log("Đang tải");
        setTimeout(() => {console.log("Đã tải được 50%")},1500);
        setTimeout(() => {console.log("Đã tải xong")},3000);
        r();
    })};

    const run = async () => {
        const result = await downloadFile();
    }

    run();