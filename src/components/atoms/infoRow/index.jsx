
import { Heading, Stack, Text, useBreakpointValue } from "@chakra-ui/react";


export default function InfoRow(props) {

    const { label, value1, value2 } = props

    const textLayout = useBreakpointValue({
        base: 'column',
        md: 'row'
    })

    return (

        <Stack direction={textLayout} spacing={6} alignItems={"center"}  >
            <Heading size={'sm'} fontWeight={"bold"}  >{label}: </Heading>

            <Text size={'sm'} flex="1" align={"end"}>{value1} {value2}</Text>
        </Stack>
    )
}