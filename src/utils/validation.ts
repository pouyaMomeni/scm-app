import * as yup from 'yup';

type ValidationResult<T>  =  {error? : string , values?: T}

export const yupValidation = async <T extends object>(
    schema : yup.Schema ,
    value : any
    ) : Promise<ValidationResult<T>> => {
    // try and catch
    try {
        const data = await schema.validate(value);
        return {values : data}
    } catch (error) {
        if(error instanceof yup.ValidationError){
            return {error : error.message}
        } else {
            return {error : (error as any).message}
        }
    }
}

const myEmailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const myPasswordRegX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
yup.addMethod(yup.string, 'email', function validateEmail(message) {
    return this.matches(myEmailRegEx, {
      message,
      name: 'email',
      excludeEmptyString: true,
    });
});
//
export const newUserSchema = yup.object({
    name: yup.
    string()
    .required('Name is missing'),
    email: yup
    .string()
    .email('invalid email')
    .required('email is missing'),
    password: yup
    .string()
    .required('password is missing')
    .min(6,"your password is too short")
    .matches(myPasswordRegX,"Your password is too simple"),
})

export const signInSchema = yup.object({
    email: yup
    .string()
    .email('invalid email')
    .required('email is missing'),
    password: yup
    .string()
    .required('password is missing')
    .min(6,"your password is too short")
    .matches(myPasswordRegX,"Your password is too simple"),
})
export const forgetPasswordSchema = yup.object({
    email: yup
    .string()
    .email('invalid email')
    .required('email is missing'),
})