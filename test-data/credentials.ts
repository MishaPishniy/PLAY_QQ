import generateRandomEmail from "../utils/generateRandomEmail";

export const users = {
    mainUser: {
        name: "TestName",
        lastName: "TestLastName",
        email: "michael@gmail.com",
        password: "ZSgeVQhuU3qkvlG",
    },
    user2: {
        name: "TestName2",
        lastName: "TestLastName2",
        email: "michael@gmail.com",
        password: "4kbkYC9q4'r,",
    },

}
// export const correctEmail = '';
export const incorrectEmail = generateRandomEmail();
// export const correctPassword = '';
export const incorrectPassword = 'wrongPassword';

// export const correctEmail2 = 'michael@gmail.com';
// export const correctPassword2 = "";