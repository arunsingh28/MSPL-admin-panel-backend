const BMI = async (weight: number, height: number) => {
    const BMI = weight / (height / 100 * height / 100);
    return BMI;
}

// bmr
const BMR = async (gender: string, weight: number, height: number, age: number) => {

    // convert age to years
    const today = new Date();
    const birthDate = new Date(age);
    age = today.getFullYear() - birthDate.getFullYear();

    if (gender === 'Male' || gender === 'male') {
        // male bmr
        const BMR = 10 * weight + 6.25 * height - 5 * age + 5;
        return BMR;
    }
    else {
        // for female
        const BMR = 10 * weight + 6.25 * height - 5 * age - 161;
        return BMR;
    }
}

export default { BMI, BMR }