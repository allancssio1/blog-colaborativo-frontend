import { CheckCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

interface SuccessMessageProps {
  message?: string;
}

export function SuccessMessage({ message }: SuccessMessageProps) {
  if (!message) return null;

  return (
    <Alert className="my-4 border-green-500 text-green-700 [&>svg]:text-green-700">
      <CheckCircle className="h-4 w-4" />
      <AlertTitle>Sucesso</AlertTitle>
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  )
}
