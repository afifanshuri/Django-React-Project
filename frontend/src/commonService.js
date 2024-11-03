import {format} from 'date-fns';

const dateFormatter = (dateToConvert) => {
    const formattedDate = format(new Date(dateToConvert), 'dd/MM/yyyy');
    return formattedDate;
}

export {dateFormatter}