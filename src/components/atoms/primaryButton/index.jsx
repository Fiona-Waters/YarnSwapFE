import { Button } from "@chakra-ui/react"



export function PrimaryButton(props) {

    const {label} = props

    return (
        <Button border={'2px'} borderColor={'gray.500'} backgroundColor={'brand.blue'} textColor={'black'} role={'add to wishlist'}>{label}</Button>
    )
}