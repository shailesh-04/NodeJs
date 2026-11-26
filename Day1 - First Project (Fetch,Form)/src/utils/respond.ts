import type { Request, Response } from "express";

type Body = { success: boolean; message: string; data?: unknown };

// True when the request came from a plain HTML <form> submit (not fetch/JSON).
export const isFormSubmit = (req: Request): boolean =>
  Boolean(req.is("application/x-www-form-urlencoded"));

// HTML form submit -> redirect back to the page with a message in the query string.
// API (JSON) request -> normal JSON response.
export function respond(req: Request, res: Response, status: number, body: Body): void {
  if (isFormSubmit(req)) {
    const query = new URLSearchParams({
      type: body.success ? "ok" : "err",
      msg: body.message,
    });
    res.redirect(303, `/?${query}`);
    return;
  }
  res.status(status).json(body);
}
