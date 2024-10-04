import moment from "moment";

export const formatDate = (date, format = "LLL") => moment(date).format(format);
