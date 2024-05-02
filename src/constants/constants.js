/*
 *   Author - Shrajan Pandey
 *
 *   All search filters with their values in select dropdown ( Tried to make same component take value form here )
 *   getting rid of redundant code
 */
export const SELECT_FILTER = [
    {
        tag: "Roles",
        values: ["Backend", "Frontend", "FullStack", "Android"],
    },
    {
        tag: "Number of Employees",
        values: ["1-10", "11-20", "21-50", "51-100", "101-500"],
    },
    {
        tag: "Expereince ( years )",
        values: ["Fresher", "1", "2", "3", "4", ">10"],
    },
    {
        tag: "Remote",
        values: ["Remote", "Hybrid", "In-office"],
    },
    {
        tag: "Minimum Base Pay LPA",
        values: ["10", "15", "20", "25", "30"],
    },
    {
        tag: "Company Name",
        values: ["Google", "Intuit", "De Shaw", "Arcesium", "Atlassian", "Microsoft"],
    },
];

/*
 *   Mapping of Tag names as in Input filter with field names in reponse given by Json
 *   Few Fileds are left blank as in given response all mappnigs are not available
 */
export const FILTER_TAG_RESPONSE_FIELD_MAPPING = {
    "Roles": "jobRole",
    "Number of Employees": "",
    "Expereince ( years )": "minExp",
    "Remote": "location",
    "Minimum Base Pay LPA": "minJdSalary",
    "Company Name": "",
};
