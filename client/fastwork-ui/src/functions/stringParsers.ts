class StringParser {
    replaceUnderscoreWithSpace (str: string) : string {
        return str.replace(/_/g, ' ');
    }
    
    convertToUpperCase (str: string) : string {
        return str.toUpperCase();
    }
}

export default StringParser;