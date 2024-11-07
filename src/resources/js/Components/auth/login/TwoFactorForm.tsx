import InputError from "../Form/InputError";
import { Button } from "@/Components/ui/button";
import FormFieldLayout from "../Form/form-field-layout";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/Components/ui/input-otp";
import { ArrowLeft, Loader } from "lucide-react";

type Props = {
    isTwoFactorOpen: boolean;
    setIsTwoFactorOpen: (value: boolean) => void;
    otpKey: number;
    errors: Record<string, string>;
    reset: (
        ...fields: ("email" | "password" | "remember" | "code_2fa")[]
    ) => void;
    setData: (field: string, value: string) => void;
    twoFactorError: string | null;
    processing: boolean;
};

const TwoFactorForm = (props: Props) => {
    const {
        isTwoFactorOpen,
        setIsTwoFactorOpen,
        otpKey,
        errors,
        reset,
        setData,
        twoFactorError,
        processing,
    } = props;
    return (
        <>
            {isTwoFactorOpen && (
                <div>
                    <div className="">
                        <Button
                            variant="link"
                            onClick={() => {
                                setIsTwoFactorOpen(false);
                                setData("code_2fa", "");
                            }}
                        >
                            <ArrowLeft className=" w-4 h-4" />
                            Retour
                        </Button>
                    </div>
                    {twoFactorError ? (
                        <>
                            <div className="text-center py-3 bg-red-100">
                                <InputError message={twoFactorError} />
                                <Button
                                    variant="link"
                                    type="submit"
                                    className="text-red-600 underline font-normal"
                                >
                                    Renvoyer un nouveau code
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="bg-secondary py-3 my-4">
                            <p className="text-sm text-center text-secondary-foreground">
                                Nous vous avons envoyé un email avec votre code
                                d'authentification.
                            </p>
                        </div>
                    )}

                    <div className="w-full flex justify-center py-4 items-center gap-3">
                        <FormFieldLayout
                            label="Code 2FA"
                            fieldName="code_2fa"
                            error={errors.code_2fa}
                        >
                            <div className="flex items-center justify-center gap-3">
                                <InputOTP
                                    disabled={processing}
                                    key={otpKey}
                                    maxLength={6}
                                    onChange={(e) => {
                                        setData("code_2fa", e);
                                    }}
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                                {processing && <Loader className="w-6 h-6 text-primary animate-spin" />}
                            </div>
                        </FormFieldLayout>
                    </div>
                </div>
            )}
        </>
    );
};

export default TwoFactorForm;
