const SignUp = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col">
                <p>SIGN UP</p>
                <span className="uppercase text-xs">Phone Number</span>
                <div className="flex gap-1 pt-2 pb-3 border-b dark:border-b-zinc-700">
                    <span>+91</span>
                    <span>-</span>
                    <input className="bg-transparent outline-none grow text-zinc-950 dark:text-zinc-300" type="tel" name="mobileNumber" id="mobileNumber" autoComplete="on" />
                </div>
            </div>
            <button className="p-4 font-bold text-[14px] leading-none uppercase bg-primary text-white">SignUp</button>
        </div>
    )
}

export default SignUp