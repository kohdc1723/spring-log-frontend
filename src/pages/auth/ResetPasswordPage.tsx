import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ErrorMessages } from "@/errors/error-messages";
import useResetPasswordMutation from "@/hooks/auth/useResetPasswordMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { SiSpring } from "react-icons/si";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";

const ResetPasswordFormSchema = z.object({
  newPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(1, { message: "Please confirm your password" })
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof ResetPasswordFormSchema>>({
    resolver: zodResolver(ResetPasswordFormSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const {
    mutate: resetPassword,
    isPending,
    isError,
    error,
  } = useResetPasswordMutation({
    onSuccess: () => {
      toast.success("Password has been reset successfully");
      navigate("/sign-in");
    }
  });

  const onSubmit = (data: z.infer<typeof ResetPasswordFormSchema>) => {
    resetPassword({
      token: token ?? "",
      newPassword: data.newPassword,
    });
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="w-full max-w-md shadow-none">
        <CardHeader>
          <CardTitle className="flex flex-col gap-8 items-center justify-center">
            <SiSpring className="size-8" />
            <div className="flex flex-col gap-2">
              <h4 className="text-center">
                Reset your password
              </h4>
              <p className="text-center text-sm font-normal text-muted-foreground">
                Please enter your new password
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-4">
              <Controller
                name="newPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="flex flex-col gap-1">
                    <FieldLabel>
                      New Password
                    </FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your new password"
                      autoComplete="off"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field className="flex flex-col gap-1">
                    <FieldLabel>Confirm Password</FieldLabel>
                    <Input
                      {...field}
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Confirm new password"
                      autoComplete="off"
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </div>
            {isError && (
              <p className="text-sm text-destructive text-center">
                {ErrorMessages[error.response?.data.code as keyof typeof ErrorMessages]
                  ?? "An unknown error occurred"}
              </p>
            )}
            <Button
              type="submit"
              variant="outline"
              disabled={isPending}
              className="w-full"
            >
              Reset Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}