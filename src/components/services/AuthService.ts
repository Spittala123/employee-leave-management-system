
const AuthService = {
    login: (username: string, password: string) => {
        // if (username === "admin" && password === "password") {
        //     localStorage.setItem("auth", "true");
        //     localStorage.setItem("role", "admin");
        //     return true;
        // } if (username === "user" && password === "password") {
        //     localStorage.setItem("auth", "true");
        //     localStorage.setItem("role", "user");
        //     return true;
        // }
        return true;
    },

    logout: () => {
        localStorage.removeItem("auth");
        localStorage.removeItem("username");

        localStorage.removeItem("Role");
    },

    isAuthenticated: () => localStorage.getItem("username") != null ,

    getRole: () => localStorage.getItem("role")

}

export default AuthService;

// *************************************** //

// const AuthService = {
//     login: (username: string, password: string) => {
//         if (username === "admin" && password === "password") {
//             localStorage.setItem("auth", "true")
//             return true;
//         }
//         return false;
//     },

//     logout: () => {
//         localStorage.removeItem("auth");
//     },

//     isAuthenticated: () => {
//         return localStorage.getItem("auth") === "true";
//     }
// }

// export default AuthService;