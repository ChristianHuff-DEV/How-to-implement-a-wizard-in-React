import { AddEmployeeWizardInput } from "../components/wizard/AddEmployeeWizard";

/**
 * The result of validating the forms input on the server side.
 */
export interface ValidationResult {
	/**
	 * Indicate wether or not the provided input is valid
	 */
	isValid: boolean;
	/**
	 * The error message for each input field
	 */
	// The errors object consists out of the keys of the form input and the value being a string array
	errors: { [P in keyof AddEmployeeWizardInput]?: string },
}

/**
 * Validates the given input data. If a field contains the value "fail" an error message for that
 * field is added, indicating that the validation failed.
 * If no field contains the value "fail" the validation succeeds.
 * 
 * @param input to be validated
 * @returns if the given input is valid and error messages for invalid inputs
 */
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