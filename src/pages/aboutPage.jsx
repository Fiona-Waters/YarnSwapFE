import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Heading, Spacer, Text, VStack } from "@chakra-ui/react";

const AboutPage = () => {


    return (
        <>
            <Spacer p='10px' />
            <Accordion allowToggle>
                <AccordionItem>
                    <h2>
                        <AccordionButton _expanded={{ bg: 'brand.blue', color: 'black' }}>
                            <Box as="span" flex='1' textAlign='left' fontSize='2xl'>
                                Yarn Swap Guidelines
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>


                        <ol>
                            <li><Heading fontSize={'lg'}>Dashboard</Heading>
                                <br></br>
                                This is where you will find all of the listings that you have added.
                                These listings can be filtered by clicking on the Filter button at the right hand side. You can filter by Brand, Weight, Fibre and Listing Status.</li>
                            <br></br>
                            <li><Heading fontSize={'lg'}>Adding Yarn Listings </Heading>
                                <br></br>
                                <ul>
                                    <li>     When adding a listing please include clear and appropriate information. You will find this information on the yarn ball band.</li>
                                    <li>    Please ensure that you provide a clear photograph. We recommend a flatlay, in bright light with a solid colour background, preferable white or black. </li>
                                    <li>    If you wish to swap yarn with other users, you should mark these listings as Swappable. You will see a Swappable toggle button when you are adding a listing.</li>
                                    <li>   Please add as many yarn listings as you would like. If you would like to catalogue your yarn stash, feel free to do it here, just remember not to mark these listings as Swappable.</li>
                                    <li>  All listings will be reviewed by Admin. If a listing is declined, a reason will be provided and you will have the opportunity to edit the listing and resubmit.</li>
                                    <li>  All of your listings can be edited or updated at any time.</li>
                                    <li>  You can view your listings on the Dashboard.</li>
                                </ul>
                            </li>
                            <br></br>
                            <li><Heading fontSize={'lg'}>Listings </Heading>
                                <br></br>
                                The Listings page is where you can find listings of Yarn that other users wish to swap.</li>
                            <br></br>

                            <li><Heading fontSize={'lg'}>Requesting a Swap </Heading>
                                <br></br>
                                <ul>
                                    <li>  You can request a swap by clicking the swap button on another users listing which you will find on the Listings page.</li>
                                    <li> You must have a token in order to request a swap.</li>
                                    <li> Tokens are earned by adding a swappable listing. 1 token is earned per listing added and each swap costs 1 token.</li>
                                    <li>  Once you have requested a swap, you can view it, and it’s status in the swaps section. You will see 2 tabs here, one of yarn that has been requested from one, and one for your requests. </li>
                                    <li>  Once a swap has been accepted a chat button will appear on the swap card, clicking here will allow you to have a conversation with the user in question regarding postage or collection of the yarn. Payment for postage is
                                        made by the user that has requested the yarn and is done offline. We suggest that you use Paypal or Revolut in order to complete this transaction. The standard cost of posting a 100g skein is €6 so the cost will usually be around this amount. This may depend on the weight of the yarn and where it is being sent.</li>
                                    <li> Each user is responsible for the swaps that they are part of. Once you have sent or received a parcel, you must update the swap card by clicking on the relevant button in order to complete the swap successfully.</li>
                                </ul>
                            </li>
                            <br></br>
                            <li><Heading fontSize={'lg'}>Wishlist </Heading>
                                <br></br>
                                Wishlist functionality is coming soon! </li>
                            <br></br>
                            <li><Heading fontSize={'lg'}>My Profile </Heading>
                                <br></br>
                                <ul>  <li>On the My Profile page you can see your user details, including the number of tokens you currently have.</li>
                                    <li>From this page you can delete your account, should you wish to. Once you have selected to do this, your account and listings will be archived for 30 days, after which time will be deleted, unless you decide to reactivate your account before that date. Account reactivation can be done in the same way as account deletion, on the My Profile page.</li>
                                </ul>
                            </li>
                            <br></br>
                        </ol>
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton _expanded={{ bg: 'brand.blue', color: 'black' }}>
                            <Box as="span" flex='1' textAlign='left' fontSize='2xl'>
                                FAQs
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        <ul>
                            <li>

                                <li>Q -  What can I swap?
                                    <br></br>
                                    A -  Yarn! You can swap skein/s of yarn with other crafters.</li>

                            </li>
                            <br></br>
                            <li>

                                <li>Q  -  Do I have to swap directly with another user?


                                    <br></br>
                                    A  -  No, once you have added a listing and received a coin, you can request yarn from
                                    any other user.</li>

                            </li>
                            <br></br>

                            <li>

                                <li>Q  -  How do I contact another user about a swap?


                                    <br></br>
                                    A  -  Once you have requested a swap and it has been accepted by the other user, you
                                    will be able to click on the chat button on the swap card in order to talk with them.</li>

                            </li>
                            <br></br>
                            <li>

                                <li>Q  -  Who pays for postage?


                                    <br></br>
                                    A  -  The user requesting the yarn always pays for postage. Postage can be paid offline,
                                    we recommend using Paypal of Revolut. </li>

                            </li>
                            <br></br>
                            <li>

                                <li>Q  -  What if I don’t like the yarn when I receive it?


                                    <br></br>
                                    A  -  You can list it again, and allow another user to request it from you!</li>

                            </li>
                            <br></br>
                            <li>

                                <li>Q  -  I have requested a swap and paid postage but the yarn has not arrived, I have tried
                                    to contact the other user but they are not responding on chat, what should I do?


                                    <br></br>
                                    A  -  Contact us at hello@yarnswap.com, we are here to help. This is a community
                                    platform built on trust, users that do not follow guidelines may have their accounts
                                    suspended.</li>

                            </li>

                        </ul>
                        <br></br>

                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </>
    );
};

export default AboutPage;