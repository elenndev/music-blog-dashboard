function getDate(fullDate: string | Date): { dateMonth: string, dateDay: number } {
    const date = new Date(fullDate);
    const monthNames: string[] = ["jan", "fev", "mar", "abr", "maio", "jun", "jul", "ago", "set", "out", "nov", "dez"];

    const monthNumber: number = date.getMonth();
    const dateMonth: string = monthNames[monthNumber];

    const dateDay: number = date.getDate();

    return { dateMonth, dateDay };
}

export default getDate;
