import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import useLoginMutation from "@/hooks/auth/useLoginMutation";
import { FcGoogle } from "react-icons/fc";
import { SiGithub, SiSpring } from "react-icons/si";
import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ErrorMessages } from "@/errors/error-messages";

const LoginFormSchema = z.object({
  email: z.email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export default function SignInPage() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    mutate: login,
    reset,
    isPending,
    isError,
    error,
  } = useLoginMutation({
    onSuccess: () => {
      navigate("/");
    },
  });

  const onSubmit = (data: z.infer<typeof LoginFormSchema>) => {
    reset();
    login(data);
  }

  const handleGoogleSocialLogin = () => {
    window.location.href = import.meta.env.VITE_GOOGLE_OAUTH2_URI;
  }

  const handleGitHubSocialLogin = () => {
    window.location.href = import.meta.env.VITE_GITHUB_OAUTH2_URI;
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="w-full max-w-md shadow-none">
        <CardHeader>
          <CardTitle className="flex flex-col gap-8 items-center justify-center">
            <SiSpring className="size-8" />
            <div className="flex flex-col gap-2">
              <h4 className="text-center">
                Sign in to your account
              </h4>
              <p className="text-center text-sm font-normal text-muted-foreground">
                Welcome back! Please sign in to continue
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <Button
              variant="outline"
              onClick={handleGoogleSocialLogin}
              className="flex items-center justify-center gap-2"
            >
              <FcGoogle className="size-5" />
              Continue with Google
            </Button>
            <Button
              variant="outline"
              onClick={handleGitHubSocialLogin}
              className="flex items-center justify-center gap-2"
            >
              <SiGithub className="size-5" />
              Continue with GitHub
            </Button>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Separator className="flex-1" />
            <span className="text-sm font-normal text-muted-foreground">
              or
            </span>
            <Separator className="flex-1" />
          </div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-4">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="flex flex-col gap-1">
                    <FieldLabel>
                      Email address
                    </FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      onChange={(e) => {
                        reset();
                        field.onChange(e);
                      }}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your email address"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="flex flex-col gap-1">
                    <FieldLabel>
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="password"
                      onChange={(e) => {
                        reset();
                        field.onChange(e);
                      }}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your password"
                      autoComplete="off"
                      type="password"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            {isError && (
              <p className="text-sm text-destructive text-center">
                {error.response?.data.code ? (
                  ErrorMessages[error.response?.data.code as keyof typeof ErrorMessages]
                ) : (
                  "An unknown error occurred"
                )}
              </p>
            )}
            <Button
              type="submit"
              variant="outline"
              disabled={isPending}
              className="w-full"
            >
              Sign In
            </Button>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <p>Don't have an account?</p>
              <Link
                to="/sign-up"
                className="underline hover:opacity-90"
              >
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}