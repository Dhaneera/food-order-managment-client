import { useState, useEffect } from "react";
import { Terminal, X } from "lucide-react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function PlaceOrderAlert({ mealIds }: { mealIds: string[] }) {
  const [visible, setVisible] = useState(true);

  

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000); // Auto-hide after 5 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <Alert className="relative">
      <Terminal className="h-4" />
      <AlertTitle>Your order successfully completed!</AlertTitle>
      <AlertDescription>
        {mealIds.length > 0 ? (
          <ul>
            {mealIds.map((id, index) => (
              <li key={index}>{id}</li>
            ))}
          </ul>
        ) : (
          <p>No meal IDs available.</p>
        )}
      </AlertDescription>
    </Alert>
  );
}