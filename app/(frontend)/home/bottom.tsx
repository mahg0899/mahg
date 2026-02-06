export default function Bottom() {
    return (
        <div className="mx-auto max-w-6/10 pt-5 pb-15">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 group">
                <div className="relative overflow-hidden bg-bento dark:bg-bento rounded-lg p-6 col-span-2 border border-main/25 hover:transition-all duration-300 hover:border-btn/50 hover:-translate-y-2 group hover:shadow-lg shadow-btn/20">
                    <h1>Articles</h1>
                    <p>Articles</p>
                </div>
                <div className="relative overflow-hidden bg-bento dark:bg-bento rounded-lg p-6 border border-main/25 hover:transition-all duration-300 hover:border-btn/50 hover:-translate-y-2 group hover:shadow-lg shadow-btn/20">
                    <h1>Articles</h1>
                    <p>Articles</p>
                </div>
                <div className="relative overflow-hidden bg-bento dark:bg-bento rounded-lg p-6 border border-main/25 hover:transition-all duration-300 hover:border-btn/50 hover:-translate-y-2 group hover:shadow-lg shadow-btn/20">
                    <h1>Articles</h1>
                    <p>Articles</p>
                </div>
            </div>
        </div>
    );
}