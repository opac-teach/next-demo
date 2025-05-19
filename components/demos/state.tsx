"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

export default function State() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h3>State</h3>
      <p>
        Count: <span data-test="count">{count}</span>
      </p>
      <Button onClick={() => setCount(count + 1)} data-test="inc">
        Increment
      </Button>
    </div>
  );
}
