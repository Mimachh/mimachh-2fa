import Checkbox from "@/Components/Checkbox";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useAuthModal } from "@/hooks/useAuthModal";
import axios from "axios";
import FormFieldLayout from "../Form/form-field-layout";
import { AuthFormProps } from "../Register/RegisterForm";
import TwoFactorForm from "./TwoFactorForm";

interface Props extends AuthFormProps {
    canResetPassword?: boolean;
}

interface StatusProps {
    token?: string;
}

interface ExtendedPageProps {
    status?: StatusProps;
}

const LoginForm = (props: Props) => {
    const contactModalOnClose = useAuthModal.use.onClose();
    const {
        canResetPassword = true,
        mode,
        onAlreadyHaveAnAccountClick,
    } = props;
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
        code_2fa: "",
    });

    const [isTwoFactorOpen, setIsTwoFactorOpen] = useState<boolean>(false);
    const [twoFactorError, setTwoFactorError] = useState<string | null>(null);

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const [otpKey, setOtpKey] = useState(0);

    // TODO
    // Watch the data.code_2fa and when it's 6 digits, submit the form
    useEffect(() => {
        if (data.code_2fa.length == 6) {
            submit();
            console.log(data);
        }
    }, [data.code_2fa]);

    const submit = (e?: React.FormEvent) => {
        setTwoFactorError(null);
        if (e) e.preventDefault();
        console.log("data", data);

        // faire via axios
        // axios.post(route("login"), {
        //     email: data.email,
        //     password: data.password,
        //     remember: data.remember,
        // }).then((response) => {
        //     console.log(response);
        //     if(response.data.two_factor) {
        //         console.log("twofactor");
        //         return;
        //     }
        //     if(mode == "modal") {
        //         contactModalOnClose()
        //     }
        // }).catch((error) => {
        //     console.log(error);
        // });

        post(route("login"), {
            preserveScroll: true,
            onSuccess: (e) => {
                const responseData = e.props
                    .status as unknown as ExtendedPageProps;
                const parsedStatus = e.props.status
                    ? JSON.parse(responseData as string)
                    : null;
                if (responseData) {
                    if (parsedStatus.token) {
                        setIsTwoFactorOpen(true);
                    }
                    if (parsedStatus === "Invalid code") {
                        setTwoFactorError(
                            "Votre code est invalide, veuillez réessayer."
                        );
                        reset("code_2fa");
                        setOtpKey((prevKey) => prevKey + 1); // Change otpKey to force re-render
                        console.log("Invalid code");
                    }
                }
                if (mode == "modal") {
                    contactModalOnClose();
                }
            },
            onError: (e) => {
                console.log({ e });
            },
        });
    };
    return (
        <form onSubmit={submit}>
            <TwoFactorForm
                isTwoFactorOpen={isTwoFactorOpen}
                setIsTwoFactorOpen={setIsTwoFactorOpen}
                otpKey={otpKey}
                errors={errors}
                reset={reset}
                setData={setData}
                twoFactorError={twoFactorError}
                processing={processing}
            />
            <div className={`${isTwoFactorOpen ? "hidden" : ""}`}>
                <div>
                    <FormFieldLayout
                        label="Email"
                        fieldName="email"
                        error={errors.email}
                    >
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full py-3 border"
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                        />
                    </FormFieldLayout>
                </div>

                <div className="mt-4">
                    <FormFieldLayout
                        label="Mot de passe"
                        fieldName="password"
                        error={errors.password}
                    >
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full py-3 border"
                            autoComplete="username"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                    </FormFieldLayout>
                </div>

                <div className=" mt-4 flex items-center justify-between">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm ">
                            Se souvenir de moi
                        </span>
                    </label>

                    {canResetPassword && (
                        <Button
                            type="button"
                            variant="link"
                            onClick={() => {
                                router.visit(route("password.request"));
                            }}
                        >
                            Mot de passe oublié ?
                        </Button>
                    )}
                </div>
            </div>

            <div className="pt-4 w-full text-center">
                <Button
                    className={`${isTwoFactorOpen ? "hidden" : ""} "w-full"`}
                    disabled={processing}
                >
                    Connexion
                </Button>
                <Button
                    variant={"link"}
                    type="button"
                    onClick={() => {
                        if (mode == "modal" && onAlreadyHaveAnAccountClick) {
                            onAlreadyHaveAnAccountClick("register");
                        } else {
                            router.visit(route("register"));
                        }
                    }}
                >
                    {" "}
                    Pas encore de compte ?{" "}
                </Button>
            </div>
        </form>
    );
};

export default LoginForm;
