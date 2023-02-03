
import { Heading, Stack, Text, useBreakpointValue } from "@chakra-ui/react";


export function InfoRow(props) {

    const {label, value} = props

    const textLayout = useBreakpointValue({
        base: 'column',
        md: 'row'
    })

    return (

        <Stack direction={textLayout} spacing={2}>
            <Heading size={'sm:'}>{label}: </Heading>
            <Text flex="1">{value}</Text>
        </Stack>
    )
}