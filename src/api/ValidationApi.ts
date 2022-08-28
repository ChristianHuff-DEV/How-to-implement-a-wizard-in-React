import { Step1FormInput } from "../components/wizard/Step1";

export interface ValidationResult {
	success: boolean;
	// The errors object consists out of the keys of the form input and the value being a string array
	errors?: { [P in keyof Step1FormInput]?: string },
}

export const validate = async (input: Step1FormInput): Promise<ValidationResult> => {

	if (input.name === "Max") {
		return { success: false, errors: { name: "Name already taken" } }
	}

	return { success: true }
}