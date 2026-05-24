import fs from "node:fs";

export default class Avis {
    constructor(name, email, rating, date, message, enfantAge) {
        this.name = name;
        this.email = email;
        this.rating = rating;
        this.date = date;
        this.enfantAge = enfantAge;
        this.message = message;
    }
    toArray() {
        return {
            name: this.name,
            email: this.email,
            rating: this.rating,
            date: this.date,
            message: this.message,
            enfantAge: this.enfantAge
        }
    }
    submit(path) {
        let data = [];

        if (fs.existsSync(path)) {
            const fileContent = fs.readFileSync(path, "utf-8").trim();
            data = fileContent ? JSON.parse(fileContent) : [];
        }

        if (!Array.isArray(data)) {
            data = [data];
        }

        data.push(this.toArray());
        fs.writeFileSync(path, JSON.stringify(data, null, 2), "utf-8");
    }
}
