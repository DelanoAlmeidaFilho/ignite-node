import { Router } from "express";
import { CategoriesRepository } from "../repositories/CategoriesRepository";
import { CreateCategoryService } from "../services/CreateCategoryService";

const categoriesRouter = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRouter.get("/", (resquest, response) => {
  const all = categoriesRepository.list();
  return response.json(all);
});

categoriesRouter.post("/", (request, response) => {
  const { name, description } = request.body;

  const createCategoriesService = new CreateCategoryService(
    categoriesRepository
  );
  createCategoriesService.execute({ name, description });

  return response.status(201).send();
});

export { categoriesRouter };
