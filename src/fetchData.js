import { productos } from "./productos";

export const fetchData = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(productos);
    }, 3000);
});