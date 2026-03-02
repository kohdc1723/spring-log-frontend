import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { SiGithub, SiSpring } from "react-icons/si";
import useSignUp from "@/hooks/auth/useSignUpMutation";

const SignUpFormSchema = z.object({
  email: z.email().min(1, { message: "Email is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function SignUpPage() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    mutate: signUp,
    isPending,
  } = useSignUp();

  const onSubmit = (data: z.infer<typeof SignUpFormSchema>) => {
    signUp(data, {
      onSuccess: () => {
        navigate("/sign-in");
        toast.success("You have successfully signed up");
      },
      onError: () => {
        toast.error("temp error message");
      }
    })
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
                Create your account
              </h4>
              <p className="text-center text-sm font-normal text-muted-foreground">
                Welcome! Please fill in details to get started
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
            <Button
              type="submit"
              variant="outline"
              disabled={isPending}
              className="w-full"
            >
              Sign Up
            </Button>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <p>Already have an account?</p>
              <Link
                to="/sign-in"
                className="underline hover:opacity-90"
              >
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}