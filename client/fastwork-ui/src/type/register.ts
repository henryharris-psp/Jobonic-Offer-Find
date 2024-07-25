type RegisterAuth = {
    username:string,
    password: string,
    confirmPassword:string,
    email: string,
    firstname: string,
    lastname: string,
    emailVerified: boolean,
    applicationNameCode:string
}

type CheckOTP = {
    otp:string
}

type RegisterJobonic = {
    id:number | null,
    companyName: string,
    phoneNumber: string,
    address: string,
    image: string,
    cardNumber: boolean,
    cardExpiryDate:string,
    walletAddress:string,
    review:number,
    userExperienceList:[],
    userEducationList:[],
    skills:[],
    userId:number
}