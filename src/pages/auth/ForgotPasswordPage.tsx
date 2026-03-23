import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useForgotPasswordMutation from "@/hooks/auth/useForgotPasswordMutation";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SiSpring } from "react-icons/si";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ErrorMessages } from "@/errors/error-messages";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const ForgotPasswordFormSchema = z.object({
  email: z.email().min(1, { message: "Email is required" })
});

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  
  const form = useForm<z.infer<typeof ForgotPasswordFormSchema>>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    mutate: forgotPassword,
    isPending,
    isError,
    error,
  } = useForgotPasswordMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Reset password link has been sent to your email address");
    }
  });

  const onSubmit = (data: z.infer<typeof ForgotPasswordFormSchema>) => {
    forgotPassword(data);
  }
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      {submitted ? (
        <Card className="w-full max-w-md shadow-none">
          <CardHeader>
            <CardTitle className="flex flex-col gap-8 items-center justify-center">
              <SiSpring className="size-8" />
              <div className="flex flex-col gap-2">
                <h4 className="text-center">
                  Check your email
                </h4>
                <p className="text-center text-sm font-normal text-muted-foreground">
                  We've sent a password reset link to your email address
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-8">
              <p className="text-center text-sm font-normal text-muted-foreground">
                If you don't see the email,
                <br />
                check your spam or try again.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Link
                  to="/sign-in"
                  className="underline hover:opacity-90"
                >
                  Back to Sign In
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full max-w-md shadow-none">
          <CardHeader>
            <CardTitle className="flex flex-col gap-8 items-center justify-center">
              <SiSpring className="size-8" />
              <div className="flex flex-col gap-2">
                <h4 className="text-center">
                  Forgot password?
                </h4>
                <p className="text-center text-sm font-normal text-muted-foreground">
                  Please enter your email to reset your password
                </p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-8"
            >
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="flex flex-col gap-1">
                    <FieldLabel>Email address</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your email address"
                      autoComplete="off"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              {isError && (
                <p className="text-sm text-destructive text-center">
                  {ErrorMessages[error.response?.data.code as keyof typeof ErrorMessages] ?? "An unknown error occurred"}
                </p>
              )}
              <Button
                type="submit"
                variant="outline"
                disabled={isPending}
                className="w-full"
              >
                Send Reset Link
              </Button>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Link
                  to="/sign-in"
                  className="underline hover:opacity-90"
                >
                  Back to Sign In
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}