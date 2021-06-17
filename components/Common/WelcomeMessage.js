import { Icon, Message, Divider } from "semantic-ui-react";
import { useRouter } from "next/router";
import Link from "next/link"

export const HeaderMessage  = () => {
    const router = useRouter();
    const registerRoute = router.pathname === "/registration";

    return (
        <Message 
            color = "teal"
            attached
            header = {registerRoute ? "Get Started" : "Welcome Back"}
            icon = {registerRoute ? "settings" : "privacy"}
            content = {registerRoute ? "Register your account" : "Login with Email and Password"}
        />
    );
};

export const FooterMessage = () => {
    const router = useRouter();
    const registerRoute = router.pathname === "/registration";

    return (
        <>
            {registerRoute ? (
                <>
                    <Message attached = "bottom" warning>
                        <Icon name = "help" />
                        Existing User? <Link href = "/login">Login Here Instead</Link>
                    </Message>
                    <Divider hidden />
                </>
            ) : (
                <>
                    <Message attached = "bottom" info>
                        <Icon name = "lock" />
                        <Link href = "/reset">Forgot Password?</Link>
                    </Message>
                    <Message attached = "bottom" warning>
                        <Icon name = "help" />
                        New User? <Link href = "/registration">Register Here</Link> Instead{" "}
                    </Message>
                </>


            )}
        </>
    );
};