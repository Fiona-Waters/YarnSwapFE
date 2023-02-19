import { Button } from "@chakra-ui/react"



export function PrimaryButton(props) {

    const {label, onClick } = props

    return (
        <Button {...props} onClick={onClick} border={'2px'} borderColor={'gray.500'} backgroundColor={'brand.blue'} textColor={'black'} >{label}</Button>
    )
}