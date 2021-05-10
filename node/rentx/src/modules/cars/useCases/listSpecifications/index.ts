import { SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";
import { ListSpecificationsController } from "./ListSpecificationsController";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

const listSpecificationsUseCase = new ListSpecificationsUseCase(
	SpecificationsRepository.getInstance()
);

export const listSpecificationsController = new ListSpecificationsController(
	listSpecificationsUseCase
)