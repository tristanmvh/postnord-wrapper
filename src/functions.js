

//used to load & parse json data templates

import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url)); 

export async function loadTemplate(template) {
    console.log(__dirname)
    var data = await fs.readFile(path.join(__dirname, "../", "templates", template), "utf8");
    return JSON.parse(data);
}

//get current date in yyyymmdd and ISO format
export function getDate() {
    const date = new Date().toISOString()
    return {
        short: date.slice(0, 10).replace(/-/g, ''),
        ISO: date
    }
}