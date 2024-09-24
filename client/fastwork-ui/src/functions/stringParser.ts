class StringParser {
    replaceUnderscoreWithSpace (str: string) : string {
        return str.replace(/_/g, ' ');
    }
    
    convertToUpperCase (str: string) : string {
        return str.toUpperCase();
    }

    convertBytesToMB (sizeInBytes: number): string {
        const sizeInMB = sizeInBytes / (1024 * 1024);
        return sizeInMB.toFixed(2); // only 2 decimal place
    }
}

export default StringParser;