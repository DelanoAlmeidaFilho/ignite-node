import { Router } from "express";
import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRouter = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRouter.get("/", (resquest, response) => {
  const all = categoriesRepository.list();
  return response.json(all);
});

categoriesRouter.post("/", (request, response) => {
  const { name, description } = request.body;

  const categoryAlreadyExists = categoriesRepository.findByName(name);
  if (categoryAlreadyExists) {
    return response.status(400).json({ error: "Category Already Exists!" });
  }

  categoriesRepository.create({ name, description });

  return response.status(201).send();
});

export { categoriesRouter };
