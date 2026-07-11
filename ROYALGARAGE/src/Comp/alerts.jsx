import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";

export default function Alerts() {
  return (
    <section>
      <Alert className="max-w-md">
        <CheckCircle2Icon />
        <AlertTitle>Account updated successfully</AlertTitle>
        <AlertDescription>
          Your profile information has been saved. Changes will be reflected
          immediately.
        </AlertDescription>
      </Alert>
    </section>
  );
}
