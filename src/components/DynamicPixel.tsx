"use client";

import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DynamicPixel() {
  useEffect(() => {
    const loadPixel = async () => {
      try {
        const { data, error } = await supabase
          .from("pixels")
          .select("script")
          .order("id", { ascending: false })
          .limit(1)
          .single();

        if (error) {
          console.error("Failed to fetch pixel:", error);
          return;
        }

        if (data?.script) {
          // Prevent duplicate insertion
          if (!document.getElementById("dynamic-meta-pixel")) {
            // Wrap your pixel in a div with an ID just for detection
            const wrapper = document.createElement("div");
            wrapper.id = "dynamic-meta-pixel";
            wrapper.innerHTML = data.script;
            document.head.appendChild(wrapper);

            // Execute any scripts inside the wrapper
            const scripts = wrapper.querySelectorAll("script");
            scripts.forEach((oldScript) => {
              const newScript = document.createElement("script");
              if (oldScript.src) {
                newScript.src = oldScript.src;
              } else {
                newScript.textContent = oldScript.textContent;
              }
              newScript.async = true;
              document.head.appendChild(newScript);
              oldScript.remove();
            });
          }
        }
      } catch (err) {
        console.error("Error loading pixel:", err);
      }
    };

    loadPixel();
  }, []);

  return null; // nothing rendered in JSX
}
