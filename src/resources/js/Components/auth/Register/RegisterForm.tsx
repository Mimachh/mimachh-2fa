import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { router, useForm } from "@inertiajs/react";
import React, { FormEventHandler, useEffect } from "react";
import FormFieldLayout from "../Form/form-field-layout";

export interface AuthFormProps {
    mode?: "modal" | "page";
    onAlreadyHaveAnAccountClick?: (value: string) => void;
}
const RegisterForm = (props: AuthFormProps) => {
    const { mode = "page", onAlreadyHaveAnAccountClick } = props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("register"), {
            preserveScroll: true,
        });
    };

    return (
        <form onSubmit={submit} className="space-form-field">
            <div className="md:grid md:grid-cols-2 md:gap-3">
                <FormFieldLayout
                    fieldName="name"
                    label="Nom"
                    error={errors.name}
                >
                    <Input
                        id="name"
                        name="name"
                        value={data.name}
                        autoComplete="name"
                        onChange={(e) => setData("name", e.target.value)}
                        required
                    />
                </FormFieldLayout>

                <FormFieldLayout
                    fieldName="email"
                    label="Email"
                    error={errors.email}
                >
                    <Input
                        id="emailRegister"
                        name="email"
                        value={data.email}
                        autoComplete="email"
                        onChange={(e) => setData("email", e.target.value)}
                        required
                    />
                </FormFieldLayout>
            </div>

            <FormFieldLayout
                fieldName="password"
                label="Mot de passe"
                error={errors.password}
            >
                <Input
                    id="password"
                    name="password"
                    value={data.password}
                    type="password"
                    autoComplete="password"
                    onChange={(e) => setData("password", e.target.value)}
                    required
                />
            </FormFieldLayout>

            <FormFieldLayout
                fieldName="password_confirmation"
                label="Confirmation du mot de passe"
                error={errors.password_confirmation}
            >
                <Input
                    id="password_confirmation"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    type="password"
                    autoComplete="password_confirmation"
                    onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                    }
                    required
                />
            </FormFieldLayout>

            <div className="text-center pt-4 block">
                <Button className="w-full" disabled={processing}>
                    S'inscrire
                </Button>
                <Button
                    type="button"
                    variant={"link"}
                    onClick={() => {
                        if (mode == "modal") {
                            if (!onAlreadyHaveAnAccountClick) return;
                            onAlreadyHaveAnAccountClick("login");
                        } else {
                            router.visit(route("login"));
                        }
                    }}
                >
                    Déjà un compte ?
                </Button>
            </div>
        </form>
    );
};

export default RegisterForm;
