import { Step1FormInput } from "../components/wizard/Step1";

type postDataResult<T> = {
	success: boolean;
	errors?: { [P in keyof T]?: string[] };
};

export const validate = ({ name }: Step1FormInput): Promise<postDataResult<Step1FormInput>> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			if (name === "Fred") {
				resolve({ success: false, errors: { name: ["The name must be unique"], }, });
			} else {
				resolve({ success: true });
			}
		}, 100);
	});
};