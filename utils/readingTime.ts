
export function calculateReadingTime(content: any): string {
    if (!content || !content.root) {
        return '1 min lectura'; // Default or minimum
    }

    let textContent = '';

    const traverse = (node: any) => {
        if (node.text) {
            textContent += node.text + ' ';
        }
        if (node.children && Array.isArray(node.children)) {
            node.children.forEach((child: any) => traverse(child));
        }
    };

    traverse(content.root);

    const words = textContent.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 200);

    return `${minutes} min lectura`;
}
