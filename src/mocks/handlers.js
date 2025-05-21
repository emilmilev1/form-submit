import { http, HttpResponse } from "msw";

export const handlers = [
    // Mock GET request to fetch interests
    http.get("/api/interests", () => {
        return HttpResponse.json([{ id: 1, name: "Sports" }, { id: 2, name: "Music" }, { id: 3, name: "Dancing" }, { id: 4, name: "Games" }]);
    }),

    // POST form submission endpoint
    http.post("/api/submit-form", async (req) => {
        const body = await req.json();

        if (!body.username || !body.email || !body.password || !body.interest) {
            return HttpResponse.json({ message: "Missing fields" }, { status: 400 });
        }

        return HttpResponse.json({ message: "Form submitted successfully", data: body }, { status: 200 });
    }),
];
