import { Request, Response, NextFunction } from 'express';

export const itemGetController= async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  return res.status(200).json({
    data: {
      message: 'Hello from the item controller! 🚀',
    },
  });
};

