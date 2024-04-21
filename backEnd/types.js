const zod = require("zod");

/*signin inputs body={
    username: string,
    email:email,
    password:minimum 8 characters string
    usertype:admin/user
}*/

const userdetails = zod.object({
    username:zod.string(),
    email:zod.string().email(),
    password:zod.string().min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be at most 32 characters long")
});

const loginDetails = zod.object({
    email:zod.string().email(),
    password:zod.string().min(8, "Password must be at least 8 characters long")
    .max(32, "Password must be at most 32 characters long")
});

//regex:.regex("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$", "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character")

const courseDetails = zod.object({
    title:zod.string(),
    description:zod.string(),
    price:zod.number().nonnegative()
})

module.exports={
    userdetails:userdetails,
    loginDetails:loginDetails,
    courseDetails:courseDetails
};