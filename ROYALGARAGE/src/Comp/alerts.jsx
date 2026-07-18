import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";

export default function Alerts({ alertMessage }) {
  return (
    <section>
      <Alert className="max-w-md fixed top-24 right-5 ">
        <CheckCircle2Icon />
        <AlertTitle>Account updated successfully</AlertTitle>
        <AlertDescription>{alertMessage}</AlertDescription>
      </Alert>
    </section>
  );
}
