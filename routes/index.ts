import express, { Request, Response } from "express";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  const params = {
    active: { home: true },
  };

  res.render("index", params);
});

export default router;
