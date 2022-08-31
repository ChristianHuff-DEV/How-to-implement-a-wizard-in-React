import { AddEmployeeWizardInput } from "../components/wizard/AddEmployeeWizard";

export interface ValidationResult {
	isValid: boolean;
	// The errors object consists out of the keys of the form input and the value being a string array
	errors: { [P in keyof AddEmployeeWizardInput]?: string },
}

export const validate = async (input: AddEmployeeWizardInput): Promise<ValidationResult> => {

	let validationResult: ValidationResult = { isValid: true, errors: {} }

	if (input.name === "fail") {
		validationResult.isValid = false
		validationResult.errors.name = "Server side validation of the name failed"
	}
	if (input.email === "fail") {
		validationResult.isValid = false
		validationResult.errors.email = "Server side validation of the email failed"
	}
	if (input.title === "fail") {
		validationResult.isValid = false
		validationResult.errors.title = "Server side validation of the title failed"
	}
	if (input.role === "fail") {
		validationResult.isValid = false
		validationResult.errors.role = "Server side validation of the role failed"
	}

	return validationResult
}