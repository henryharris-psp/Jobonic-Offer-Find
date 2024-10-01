import moment from "moment";

class DateParser {
    getDate = (dateString: string): string => {
        const dateObj = new Date(moment.utc(dateString, 'YYYY-MM-DD HH:mm:ss').toISOString());

        let day: number | string = dateObj.getDate();
        let month: number | string = dateObj.getMonth();
        const year: string = dateObj.getFullYear().toString().substring(2);

        day = day < 10 ? '0' + day : day;
        month = month + 1;

        month = month < 10 ? '0' + month : month;

        return `${day}/${month}/${year}`;
    };

    getFormattedDate = (dateString: string): string => {
        const dateObj = new Date(moment.utc(dateString, 'YYYY-MM-DD HH:mm:ss').toISOString());
    
        let day: number | string = dateObj.getDate();
        const shortMonthNames: string[] = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        const month: string = shortMonthNames[dateObj.getMonth()];
        const year: string = dateObj.getFullYear().toString();
    
        day = day < 10 ? '0' + day : day;
    
        return `${day} ${month} ${year}`;
    };
    

    getTime = (dateString: string): string => {
        const dateObj = new Date(moment.utc(dateString).toISOString());

        const rawHour: number = dateObj.getHours();
        const hour: number = rawHour === 0 ? 12 : (rawHour > 12 ? rawHour - 12 : rawHour);

        const minute: number = dateObj.getMinutes();
        const formattedMinute: string = minute < 10 ? '0' + minute : minute.toString();

        const period: string = rawHour < 12 ? 'AM' : 'PM';

        return `${hour}:${formattedMinute} ${period}`;
    };

    getDateTime = (dateString: string): string => {
        const date = this.getDate(dateString);
        const time = this.getTime(dateString);
        return `${date} ${time}`;
    };
}

export default DateParser;
