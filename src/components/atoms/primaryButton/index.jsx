import { Button } from "@chakra-ui/react"



export function PrimaryButton(props) {

    const {label, onclick } = props

    return (
        <Button onClick={onclick} border={'2px'} borderColor={'gray.500'} backgroundColor={'brand.blue'} textColor={'black'} role={'add to wishlist'}>{label}</Button>
    )
}