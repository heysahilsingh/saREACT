interface ButtonProps {
    text: string
}

const Button = (props: ButtonProps) => {
    return (
        <button className="flex bg-primary text-green-600">{props.text}</button>
    )
}

export default Button