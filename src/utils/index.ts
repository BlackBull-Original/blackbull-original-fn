export const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

const currentDate = new Date();
const { getDate, getMonth, getFullYear } = currentDate;
export const formattedDate = `${getDate.call(currentDate).toString().padStart(2, '0')}-${(getMonth.call(currentDate) + 1).toString().padStart(2, '0')}-${getFullYear.call(currentDate)}`;
console.log(formattedDate);
