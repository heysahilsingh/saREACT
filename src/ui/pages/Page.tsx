import { ReactNode } from "react"


interface PageProps{
    children: ReactNode,
    pageName: string
}

const Page = (props: PageProps) => {
    return (
        <div className={props?.pageName + " page"}>
            {props.children}
        </div>
    )
}

export default Page