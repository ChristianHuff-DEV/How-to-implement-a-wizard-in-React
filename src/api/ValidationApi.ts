import { AddEmployeeWizardInput } from "../components/wizard/AddEmployeeWizard";

export interface ValidationResult {
	isValid: boolean;
	// The errors object consists out of the keys of the form input and the value being a string array
	errors?: { [P in keyof AddEmployeeWizardInput]?: string },
}

export const validate = async (input: AddEmployeeWizardInput): Promise<ValidationResult> => {

	if (input.name === "Tom" || input.name === "tom") {
		return { isValid: false, errors: { name: "Name already taken" } }
	}

	return { isValid: true }
}