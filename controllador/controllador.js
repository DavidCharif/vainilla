import { url } from "../api/url.js";
import { getData } from "./servicio.js";

export const getPaises = async () => {
    let obj = await getData(url);
    console.log(obj)
}
