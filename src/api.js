/*
 *   Author - Shrajan Pandey
 *
 *   Function making API Calls and fetching Job data
 */

async function fetchJobListings(offset) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        limit: 9,
        offset: offset,
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
    };

    const data = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            return result;
        })
        .catch((error) => console.error(error));

    return data;
}

export default fetchJobListings;
