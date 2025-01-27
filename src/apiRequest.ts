export class ApiRequest {
    async fetchData(url: string): Promise<any> {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
            }

            const contentType = response.headers.get("Content-Type");

            if (contentType?.includes("application/json")) {
                return await response.json();
            } else if (contentType?.includes("text/html")) {
                const html = await response.text();
                return html;
            } else {
                throw new Error(`Unexpected Content-Type: ${contentType}`);
            }
        } catch (error) {
            console.error(`Error fetching data from ${url}:`, error);
            throw new Error(`Failed to fetch data from ${url}, ${error}`);
        }
    }
}
