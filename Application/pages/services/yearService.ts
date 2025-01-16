// services/yearService.ts
export const submitYear = async (year: string) => {
    try {
        const response = await fetch('/run', {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ year })
        });
        
        if (!response.ok) {
            throw new Error('Failed to process year');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error processing year:', error);
        throw error;
    }
};