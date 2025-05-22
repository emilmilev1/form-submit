import { http, HttpResponse } from "msw";

const registeredUser = {};

export const handlers = [
    // Mock GET request to fetch interests
    http.get("/api/interests", () => {
        return HttpResponse.json([{ id: 1, name: "Sports" }, { id: 2, name: "Music" }, { id: 3, name: "Dancing" }, { id: 4, name: "Games" }]);
    }),

    // POST form submission endpoint
    http.post("/api/submit", async ({ request }) => {
        const formData = await request.formData();

        const firstName = formData.get("firstName")?.toString() || "";
        const lastName = formData.get("lastName")?.toString() || "";
        const password = formData.get("password")?.toString() || "";
        const avatar = formData.get("avatar");

        const interestsStr = formData.get("interests")?.toString() || "[]";
        let interests;
        try {
            interests = JSON.parse(interestsStr);
        } catch {
            interests = [];
        }

        if (!(avatar instanceof File)) {
            return HttpResponse.json({ message: "Avatar file is required" }, { status: 400 });
        }

        if (!firstName || !lastName || !password || interests.length === 0) {
            return HttpResponse.json({ message: "Missing fields" }, { status: 400 });
        }

        registeredUser.firstName = firstName;
        registeredUser.lastName = lastName;
        registeredUser.password = password;
        registeredUser.interests = interests;
        registeredUser.avatar = avatar;

        return HttpResponse.json(
            { message: "Form submitted successfully", data: registeredUser },
            { status: 200 }
        );
    }),
];
