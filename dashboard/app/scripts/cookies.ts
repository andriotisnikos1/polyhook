import cookie from "cookie";

class Cookie {
    name: string;
    params: cookie.CookieSerializeOptions;
    constructor(name: string, params: cookie.CookieSerializeOptions) {
        this.name = name;
        this.params = params;
    }
    public parse(cookieHeader: string) {
        const cookies = cookie.parse(cookieHeader);
        return cookies[this.name];
    }
    public serialize(value: any) {
        return cookie.serialize(this.name, String(value), this.params);
    }
}

export const sessionToken = new Cookie("sessionID", {
    httpOnly: true,
    maxAge: 60 * 60,
    sameSite: "lax",
});

export default {
    session: sessionToken,
}
