export default function Middle() {
    return (
        <div className="mx-auto max-w-6/10 pt-5">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 group">
                <div className="flex flex-col border border-contrast rounded-lg p-6">
                    <h1>Articles</h1>
                    <p>Articles</p>
                </div>
                <div className="flex flex-col col-span-2 border border-contrast rounded-lg p-6">
                    <h1>Articles</h1>
                    <p>Articles</p>
                </div>
                <div className="flex flex-col border border-contrast rounded-lg p-6">
                    <h1>Articles</h1>
                    <p>Articles</p>
                </div>
            </div>
        </div>
    );
}