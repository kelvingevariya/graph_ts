import express, { Request, Response } from "express";
import bodyParser from "body-parser";

const router = express.Router();

router.use(bodyParser.json());

router.post("/", (req: Request, res: Response) => {
  if (req.query.validationToken) {
    res.status(200).send(req.query.validationToken);
  } else {
    const notification = req.body;
    console.log("Received notification:");
    res.status(202).json({ notification });
  }
});

router.get("/", (req: Request, res: Response) => {
  res.status(200).send("Ok");
});

export default router;
