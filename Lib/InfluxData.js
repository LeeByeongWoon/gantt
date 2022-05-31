import axios from "axios";

export async function getDomain() {
    const res = await axios.get("/rest/1.0/influxdb/databases");
    return res.data;
}

export async function getMeasurement(domain) {
    const res = await axios.get(`/rest/1.0/influxdb/mewsurments/${domain}`);
    return res.data;
}
